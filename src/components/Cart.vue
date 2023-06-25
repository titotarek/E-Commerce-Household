<template>
	<div>
		<Header />
		<ul v-if="cartItems.length > 0" class="cart-items">
			<li v-for="item in cartItems" :key="item.id" class="cart-item">
				<div class="item-info">
					<img :src="item.image" alt="" class="item-image" />
					<span>{{ item.productName }}  -  ${{ item.price }}</span>
				</div>
				<div class="item-actions">
					<button @click="removeFromCartHandler(item.id)">
						<img class="delete-image" src="../assets/delete.png" alt="" />
					</button>
				</div>
			</li>
		</ul>
		<p class="item-error" v-else>No items saved in the cart.</p>
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
