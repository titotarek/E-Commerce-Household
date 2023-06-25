<template>
	<div class="layout ">

		<Header />

		<main >
			<slot></slot>
		</main>
		<Footer />
	</div>
</template>

<script>
import Footer from "./Footer.vue";
import Header from "./Header.vue";

export default {
	name: "MainLayout",
	components: {
		Header,
		Footer,
	},
};
</script>

<style></style>
