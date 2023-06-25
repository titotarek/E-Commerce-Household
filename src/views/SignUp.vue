<template>
	<div class="sing-up">
		<div class="container">
			<h1 class="form-title">Create your account</h1>
			<form @submit.prevent="validateForm">
				<label>Email</label>
				<input
					type="text"
					placeholder="Enter your email "
					v-model="userData.email"
				/>
				<p class="error-message" v-if="errors.email">{{ errors.email }}</p>

				<label>Password</label>
				<input
					type="password"
					placeholder="Create password "
					v-model="userData.password"
				/>
				<p class="error-message" v-if="errors.password">
					{{ errors.password }}
				</p>

				<label>Confirm Password</label>
				<input
					type="password"
					placeholder="Confirm Password"
					v-model="confirmPassword"
				/>
				<p class="error-message" v-if="errors.confirmPassword">
					{{ errors.confirmPassword }}
				</p>

				<button type="submit" class="login-btn">Register</button>
				<div class="signup-link">
					<p>
						You already have an account?
						<router-link to="/login">Login</router-link>
					</p>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			userData: {
				email: "",
				password: "",
			},
			confirmPassword: "",
			errors: {
				email: "",
				password: "",
				confirmPassword: "",
			},
		};
	},

	methods: {
		validateForm() {
			this.errors.email = "";
			this.errors.password = "";
			this.errors.confirmPassword = "";

			const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailPattern.test(this.userData.email)) {
				this.errors.email = "Invalid email format";
				return;
			}

			if (this.userData.password !== this.confirmPassword) {
				this.errors.confirmPassword = "Passwords do not match";
				return;
			} else if (this.userData.password.length < 5) {
				this.errors.password = "Password should be at least 5 characters long";
				return;
			}

			this.$router.push("/login");
		},
	},

	watch: {
		// It clears the errors.email message by setting it to an empty string.
		"userData.email"() {
			this.errors.email = "";
		},
		// It clears the errors.password message by setting it to an empty string.

		"userData.password"() {
			this.errors.password = "";
		},
		// It clears the errors.confirmPassword message by setting it to an empty string.
		confirmPassword() {
			this.errors.confirmPassword = "";
		},
	},
};
</script>
