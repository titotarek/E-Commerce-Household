<template>
	<header>
		<router-link class="header-title" to="/">
			<h1>MyStore.</h1>
		</router-link>
		<LogoutButton v-if="isLoggedIn" />
		<LoginButton v-else />
		<CartButton />
	</header>
</template>

<script>
import LoginButton from "./LoginButton.vue";
import LogoutButton from "./LogoutButton.vue";
import CartButton from "./CartButton.vue";

export default {
	components: {
		LogoutButton,
		LoginButton,
		CartButton,
	},
	computed: {
		isLoggedIn() {
			return localStorage.getItem("userCredentials") !== null;
		},
	},
};
</script>
