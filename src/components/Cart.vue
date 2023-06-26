<template>
	<div class="my-card">
		<Header />
		<ul v-if="cartItems.length > 0" class="my-cart-items">
			<li v-for="item in cartItems" :key="item.id" class="my-cart-card">
				<div class="my-item-card">
					<div class="my-item-info">
						<img :src="item.image" alt="" class="my-item-image" />
						<div class="my-item-details">
							<span class="my-item-name">{{ item.productName }}</span>
							<span class="my-item-price">${{ item.price }}</span>
						</div>
					</div>
					<div class="my-item-actions">
						<button @click="removeFromCartHandler(item.id)">
							<img class="my-delete-image" src="../assets/delete.png" alt="" />
						</button>
					</div>
				</div>
			</li>
		</ul>
		<p class="my-item-error" v-else>No items saved in the cart.</p>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Header from "./Header.vue";

export default {
	components: { Header },
	computed: {
		...mapGetters(["cartItems"]),
	},
	methods: {
		...mapActions(["removeFromCart", "clearCart"]),
		removeFromCartHandler(productId) {
			this.removeFromCart(productId);
		},
		clearCartHandler() {
			this.clearCart();
		},
	},
};
</script>
