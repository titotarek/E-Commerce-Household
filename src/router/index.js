import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import ProductDetails from "../views/ProductDetails.vue";
import ProductOverview from "../views/ProductOverview.vue";
import SignUp from "../views/SignUp.vue";

const routes = [
	{
		path: "/login",
		name: "Login",
		component: Login,
	},
	{
    path: "/sign-up",  // Corrected path
    name: "SignUp",
    component: SignUp,
  },
	{
		path: "/",
		name: "ProductOverview",
		component: ProductOverview,
	},
	{
		path: "/product-details/:id",
		name: "ProductDetails",
		component: ProductDetails,
		props: true,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
