import axios from "axios";
import { createStore } from "vuex";

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
	},
});
