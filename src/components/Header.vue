

<template>
	<div>
		<header>
			<router-link class="header-title" to="/">
				<h1>MyStore.</h1>
			</router-link>
			<button v-if="isLoggedIn" @click="logout" class="logout-btn">
				Logout
			</button>
			<router-link v-else to="/login" class="login-btn">Login</router-link>
		</header>
	</div>
</template>

<script>
export default {
	methods: {
		logout() {
			localStorage.removeItem("userCredentials");
			this.$router.push("/login");
		},
	},
	computed: {
		isLoggedIn() {
			return localStorage.getItem("userCredentials") !== null;
		},
	},
};
</script>
