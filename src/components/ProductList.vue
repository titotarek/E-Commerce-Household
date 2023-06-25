<template>
	<div>
		<div class="filter-section">
			<!-- Filter options section -->
			<h3>Filters:</h3>
			<div class="filter-group">
			
				<label for="productType">Product Type:</label>
				<select
					id="productType"
					v-model="selectedFilters.productType"
					@change="addToFilter('productType')"
				>
					<option value="">All</option>
					<option
						v-for="type in filters.product_types"
						:value="type"
						:key="type"
					>
						{{ type }}
					</option>
				</select>
			</div>
			<div class="filter-group">
				<label for="brand">Brand:</label>
				<select
					id="brand"
					v-model="selectedFilters.brand"
					@change="addToFilter('brand')"
				>
					<option value="">All</option>
					<option v-for="brand in filters.brands" :value="brand" :key="brand">
						{{ brand }}
					</option>
				</select>
			</div>
			<div class="filter-group">
				<label for="price">Price: $</label>
				<select
					id="price"
					v-model="selectedFilters.price"
					@change="addToFilter('price')"
				>
					<option value="">All</option>
					<option v-for="price in filters.prices" :value="price" :key="price">
						{{ price }}
					</option>
				</select>
			</div>
		</div>
		<ul class="product-list">
			<li
				class="product-card"
				v-for="product in filteredProducts"
				:key="product.id"
			>
				<router-link
					:to="{ name: 'ProductDetails', params: { id: product.id } }"
				>
					<img :src="product.image" :alt="product.image" />
					<p class="product-name">{{ product.productName }}</p>
					<p class="product-price">${{ product.price }}</p>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
	name: "ProductList",
	computed: {
		...mapState(["products", "filters", "selectedFilters"]),
		filteredProducts() {
			// Filter the products based on selected filter values
			const { productType, brand, price } = this.selectedFilters;
			return this.products.filter((product) => {
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
	methods: {
		// allowing the component to call the action for the => fetchData()
		...mapActions(["fetchData"]),
		// allowing the component to call the mutation for the =>  
		...mapMutations({
			add: "ADD_TO_FILTER",
		}),
		addToFilter(filter) {
			// Add the selected filter to the filter list
			const selectedValue = this.selectedFilters[filter];
			if (selectedValue === "") {
				this.selectedFilters = [];
			} else {
				this.add({ filter, item: selectedValue });
			}
		},
	},
	mounted() {
		// Fetch initial data
		this.fetchData().catch((error) => {
			console.error(error);
		});
	},
};
</script>
