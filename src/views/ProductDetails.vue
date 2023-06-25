<template>
	<MainLayout>
		<div class="container">
			<div v-if="product">
				<h1>${{ product.price }}</h1>
				<div class="info-container">
					<h2 class="product-name">{{ product.productName }}</h2>
					<img src="../assets/star.png" alt="Star" class="star-image" />
				</div>
				<ul class="content-container">
					<li>
						<p>${{ product.price }}</p>
					</li>
					<li>
						<p>{{ product.brand }}</p>
					</li>
					<li>
						<p>{{ product.type }}</p>
					</li>
					<li>
						<p>{{ product.usage }}</p>
					</li>
				</ul>
				<div class="image-container">
					<img
						:src="product.image"
						:alt="product.image"
						class="product-image"
					/>
				</div>
				<button class="add-to-cart-button" @click="addToCartHandler(product)">
					Add to Cart
				</button>
			</div>
		</div>

		<div class="recommended" v-if="recommendedProducts.length > 0">
			<h2 class="recommended-title">Recommendations</h2>
			<ul class="recommended-list">
				<li
					class="recommended-product-card"
					v-for="recommendedProduct in recommendedProducts"
					:key="recommendedProduct.id"
				>
					<router-link
						:to="{
							name: 'ProductDetails',
							params: { id: recommendedProduct.id },
						}"
						class="recommended-product-link"
						@click="selectRecommendedProduct(recommendedProduct)"
					>
						<img
							:src="recommendedProduct.image"
							:alt="recommendedProduct.image"
							class="recommended-product-image"
						/>
						<p>{{ recommendedProduct.productName }}</p>
					</router-link>
				</li>
			</ul>
		</div>
	</MainLayout>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MainLayout from "../components/MainLayout.vue";

export default {
	props: {
		id: {
			type: String,
			required: true,
		},
	},
	components: {
		MainLayout,
	},
	computed: {
		...mapGetters(["selectedProduct", "products"]),
		product() {
			return this.selectedProduct;
		},
		recommendedProducts() {
			if (this.product) {
				const brand = this.product.brand;
				return this.products.filter(
					(product) => product.brand === brand && product.id !== this.product.id
				);
			}
			return [];
		},
	},
	methods: {
		...mapActions(["fetchProductById", "addToCart"]),
		selectRecommendedProduct(recommendedProduct) {
			this.fetchProductById(recommendedProduct.id);
		},
		addToCartHandler(product) {
			this.addToCart(product);
		},
	},
	created() {
		this.fetchProductById(this.id);
	},
};
</script>
