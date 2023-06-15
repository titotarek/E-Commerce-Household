<template>
	<footer>
		<p>&copy;{{ currentYear }} MyStore</p>
	</footer>
</template>

<script>
export default {
	data() {
		return {
			currentYear: new Date().getFullYear(),
		};
	},
};
</script>
