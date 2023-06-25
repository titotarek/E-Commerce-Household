import axios from "axios";
import { createStore } from "vuex";

// Vuex plugin for cart persistence
const cartPersistPlugin = (store) => {
	// Load cart data from local storage on store initialization
	const cartData = localStorage.getItem("cart");
	if (cartData) {
		store.commit("SET_CART_ITEMS", JSON.parse(cartData));
		store.commit("SET_CART_ITEM_COUNT", JSON.parse(cartData).length);
	}

	// Save cart data to local storage whenever it changes
	store.subscribe((mutation, state) => {
		if (
			mutation.type === "ADD_TO_CART" ||
			mutation.type === "REMOVE_FROM_CART" ||
			mutation.type === "CLEAR_CART" ||
			mutation.type === "UPDATE_CART_ITEM_QUANTITY"
		) {
			localStorage.setItem("cart", JSON.stringify(state.cartItems));
			store.commit("SET_CART_ITEM_COUNT", state.cartItems.length);
		}
	});
};

export default createStore({
	state: {
		products: [],
		filters: {
			product_types: [],
			brands: [],
			prices: [
				"0 - 200",
				"201 - 500",
				"501 - 800",
				"801 - 1200",
				"1201 - 2000",
			],
		},
		selectedFilters: {
			productType: "",
			brand: "",
			price: "",
		},
		selectedProductId: null,
		cartItems: [],
		cartItemCount: 0,
	},
	mutations: {
		SET_PRODUCTS(state, products) {
			state.products = products;
		},
		ADD_TO_FILTER(state, { filter, item }) {
			if (!state.selectedFilters[filter]) {
				state.selectedFilters[filter] = [];
			}
			const selectedFilter = state.selectedFilters[filter];
			if (!selectedFilter.includes(item)) {
				selectedFilter.push(item);
			}
		},
		SET_SELECTED_PRODUCT_ID(state, productId) {
			state.selectedProductId = productId;
		},
		SET_PRODUCT_TYPES(state, types) {
			state.filters.product_types = types;
		},
		SET_BRANDS(state, brands) {
			state.filters.brands = brands;
		},
		ADD_TO_CART(state, product) {
			const existingProduct = state.cartItems.find(
				(item) => item.id === product.id
			);
			if (existingProduct) {
				existingProduct.quantity++;
			} else {
				const newProduct = { ...product, quantity: 1 };
				state.cartItems.push(newProduct);
			}
		},
		REMOVE_FROM_CART(state, productId) {
			state.cartItems = state.cartItems.filter(
				(product) => product.id !== productId
			);
		},
		CLEAR_CART(state) {
			state.cartItems = [];
		},
		SET_CART_ITEMS(state, cartItems) {
			state.cartItems = cartItems;
		},
		UPDATE_CART_ITEM_QUANTITY(state, { index, quantity }) {
			state.cartItems[index].quantity = quantity;
		},
		SET_CART_ITEM_COUNT(state, count) {
			state.cartItemCount = count;
		},
	},
	actions: {
		fetchData({ commit }) {
			return axios
				.get("/db.json")
				.then((response) => {
					const data = response.data;
					commit("SET_PRODUCTS", data);
					const productTypes = [
						...new Set(data.map((product) => product.type)),
					];
					commit("SET_PRODUCT_TYPES", productTypes);
					const brands = [...new Set(data.map((product) => product.brand))];
					commit("SET_BRANDS", brands);
				})
				.catch((error) => {
					console.error(error);
					throw error;
				});
		},
		fetchProductById({ commit, state }, productId) {
			if (state.products.length > 0) {
				commit("SET_SELECTED_PRODUCT_ID", productId);
			} else {
				return axios.get("/db.json").then((response) => {
					const data = response.data;
					commit("SET_PRODUCTS", data);
					commit("SET_SELECTED_PRODUCT_ID", productId);
				});
			}
			sessionStorage.setItem("selectedProductId", productId);
		},
		clearSelectedProduct({ commit }) {
			commit("SET_SELECTED_PRODUCT_ID", null);
			sessionStorage.removeItem("selectedProductId");
		},
		restoreSelectedProduct({ commit }) {
			const selectedProductId = sessionStorage.getItem("selectedProductId");
			if (selectedProductId) {
				commit("SET_SELECTED_PRODUCT_ID", selectedProductId);
			}
		},
		// addToCart({ commit }, product) {
		// 	commit("ADD_TO_CART", product);
		// 	commit("SET_CART_ITEM_COUNT", product.quantity);
		// },
		addToCart({ commit, state }, product) {
			const existingProduct = state.cartItems.find(
				(item) => item.id === product.id
			);
			if (existingProduct) {
				// Increment the quantity if the product is already in the cart
				const updatedQuantity = existingProduct.quantity + 1;
				commit("UPDATE_CART_ITEM_QUANTITY", {
					index: state.cartItems.indexOf(existingProduct),
					quantity: updatedQuantity,
				});
				commit("SET_CART_ITEM_COUNT", state.cartItemCount + 1);
			} else {
				// Add the product as a new item in the cart
				const newProduct = { ...product, quantity: 1 };
				commit("ADD_TO_CART", newProduct);
				commit("SET_CART_ITEM_COUNT", state.cartItemCount + 1);
			}
		},
		// ...
		removeFromCart({ commit, state }, productId) {
			const itemIndex = state.cartItems.findIndex(
				(item) => item.id === productId
			);
			const quantity = state.cartItems[itemIndex].quantity;
			commit("REMOVE_FROM_CART", productId);
			commit("SET_CART_ITEM_COUNT", state.cartItemCount - quantity);
		},
		clearCart({ commit }) {
			commit("CLEAR_CART");
			commit("SET_CART_ITEM_COUNT", 0);
		},
	},
	getters: {
		selectedProduct: (state) => {
			if (state.selectedProductId) {
				return state.products.find(
					(product) => product.id === state.selectedProductId
				);
			}
			return null;
		},
		products: (state) => state.products,
		filters: (state) => state.filters,
		selectedFilters: (state) => state.selectedFilters,
		filteredProducts: (state) => {
			const { productType, brand, price } = state.selectedFilters;
			return state.products.filter((product) => {
				if (productType && productType !== product.type) {
					return false;
				}
				if (brand && brand !== product.brand) {
					return false;
				}
				if (price) {
					const [startPrice, endPrice] = price.split("-");
					if (
						product.price < parseInt(startPrice) ||
						product.price > parseInt(endPrice)
					) {
						return false;
					}
				}
				return true;
			});
		},
		cartItems: (state) => state.cartItems,
		cartItemCount: (state) => state.cartItemCount,
	},
	plugins: [cartPersistPlugin],
});
