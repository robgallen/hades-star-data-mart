import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import ShipModule from "@/components/ShipModule";

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: "/",
			name: "HelloWorld",
			component: HelloWorld
		}, {
			path: "/module",
			name: "ShipModule",
			component: ShipModule
		}
	]
});
