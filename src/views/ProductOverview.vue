<template>
	<MainLayout>
		<ProductList />
	</MainLayout>
</template>

<script>
import MainLayout from "../components/MainLayout.vue";
import ProductList from "../components/ProductList.vue";
export default {
	components: { ProductList, MainLayout },
	name: "ProductOverview",
	data() {
		return {};
	},
};
</script>
