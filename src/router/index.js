import Vue from "vue";
import Router from "vue-router";
import About from "@/components/About";
import ShipModule from "@/components/ShipModule";

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: "/",
			name: "About",
			component: About
		}, {
			path: "/module",
			name: "Modules",
			component: ShipModule
		}
	]
});
