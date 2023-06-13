export const formValidationMixin = {
	data() {
		return {
			errorEmail: "",
			errorPassword: "",
		};
	},
	methods: {
		validateForm() {
			if (!this.$options.mixins[0].methods.validateForm.call(this)) {
				// Validation failed, handle the error
				return;
			}

			if (this.password !== this.confirmPassword) {
				this.errorMsg = "Passwords do not match.";
				return;
			}

			// Perform registration logic
			// ...
		},
	},
};
