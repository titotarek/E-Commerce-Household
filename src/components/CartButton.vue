<template>
	<div>
		<router-link to="/cart-products">
			<button class="header-button">
				<span
					v-if="cartItems.length > 0"
					:class="['cart-item-count', { show: cartItems.length > 0 }]"
				>
					{{ cartItems.length }}
				</span>
				<img class="header-image" src="../assets/grocery-store.png" alt="" />
			</button>
		</router-link>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {

	computed: {
		...mapGetters(["cartItems"]),
	},
};
</script>
