<template>
	<header>
		<router-link class="header-title" to="/">
			<h1>MyStore.</h1>
		</router-link>
		<LogoutButton v-if="isLoggedIn" />
		<LoginButton v-else />
	</header>
</template>

<script>
import LoginButton from "./LoginButton.vue";
import LogoutButton from "./LogoutButton.vue";

export default {
	components: {
		LogoutButton,
		LoginButton,
	},
	computed: {
		isLoggedIn() {
			return localStorage.getItem("userCredentials") !== null;
		},
	},
};
</script>
