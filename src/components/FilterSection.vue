<template>
	<div class="filter-section">
		<h3>Filters:</h3>
		<div class="filter-group">
			<label for="productType">Product Type:</label>
			<select id="productType" v-model="selectedFilters.productType">
				<option value="">All</option>
				<option v-for="type in filters.product_types" :value="type" :key="type">
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
</template>

<script>
import { mapState } from "vuex";

export default {
	computed: {
		...mapState(["filters", "selectedFilters"]),
	},
};
</script>
