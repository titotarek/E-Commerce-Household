<template>
	<div class="home">
		<MainLayout>
			<ProductList />
		</MainLayout>
	</div>
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
