import Vue from "vue";
import Router from "vue-router";
import About from "@/components/About";
import Module from "@/components/modules/Module";

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: "/",
			name: "About",
			component: About
		}, {
			path: "/module",
			name: "Module",
			component: Module
		}
	]
});
