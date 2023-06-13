<template>
	<div>
		<div class="filter-section">
			<h3>Filters:</h3>
			<div class="filter-group">
				<label for="productType">Product Type:</label>
				<select id="productType" v-model="selectedFilters.productType">
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
				<select id="brand" v-model="selectedFilters.brand">
					<option value="">All</option>
					<option v-for="brand in filters.brands" :value="brand" :key="brand">
						{{ brand }}
					</option>
				</select>
			</div>
			<div class="filter-group">
				<label for="price">Price: $ </label>
				<select id="price" v-model="selectedFilters.price">
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
import { mapActions, mapState } from "vuex";

export default {
	name: "ProductList",
	computed: {
		...mapState(["products", "filters", "selectedFilters"]),
		filteredProducts() {
			const { productType, brand, price } = this.selectedFilters;
			return this.products.filter((product) => {
				if (productType && String(productType) !== String(product.type)) {
					return false;
				}
				if (brand && String(brand) !== String(product.brand)) {
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
		...mapActions(["fetchData"]),
		addToFilter(filter, item) {
			this.$store.commit("ADD_TO_FILTER", { filter, item });
		},
	},
	mounted() {
		this.fetchData().catch((error) => {
			console.error(error);
		});
	},
};
</script>
