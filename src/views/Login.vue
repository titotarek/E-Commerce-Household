<template>
	<div class="container">
		<div class="form-title">
			<h1>Welcome back!</h1>
		</div>

		<div>
			<form @submit.prevent="login">
				<label>Email</label>
				<input type="text" placeholder="Enter your email" v-model="email" />

				<div v-if="errors.email" class="error-message">{{ errors.email }}</div>

				<label>Password</label>
				<input
					type="password"
					placeholder="Create password"
					v-model="password"
				/>

				<div v-if="errors.password" class="error-message">
					{{ errors.password }}
				</div>

				<button
					type="submit"
					class="login-btn"
					:class="['disabled-button', { active: isFormValid }]"
					:disabled="!isFormValid"
				>
					Login
				</button>
			</form>
			<div class="signup-link">
				<p>
					Don't you have an account?
					<router-link to="/sign-up">Sign Up</router-link>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Login",
	data() {
		return {
			email: "",
			password: "",
			errors: {
				email: "",
				password: "",
			},
		};
	},
	computed: {
		isFormValid() {
			return (
				this.email.trim() !== "" &&
				this.password.trim() !== "" &&
				this.errors.email === "" &&
				this.errors.password === ""
			);
		},
	},
	methods: {
		login() {
			localStorage.setItem(
				"userCredentials",
				JSON.stringify({ email: this.email })
			);

			this.$router.push("/");
		},
		validateEmail(email) {
			if (email.trim() === "") {
				this.errors.email = "";
			} else if (!this.validateEmailFormat(email)) {
				this.errors.email = "Invalid email address.";
			} else {
				this.errors.email = "";
			}
		},
		validatePassword(password) {
			if (password.trim() === "") {
				this.errors.password = "";
			} else if (password.length < 5) {
				this.errors.password = "Password should be at least 5 characters long.";
			} else {
				this.errors.password = "";
			}
		},
		validateEmailFormat(email) {
			// Email validation regex pattern
			const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			return emailPattern.test(email);
		},
	},
	watch: {
		email(newValue) {
			this.validateEmail(newValue);
		},
		password(newValue) {
			this.validatePassword(newValue);
		},
	},
};
</script>
