<template>
	<div class="container">
		<div id="modules">
			<b-form-select v-model="selected" v-on:change="selectMod">
				<option v-for="mod in mods" v-bind:key="mod.name" v-bind:value="mod.name">{{ mod.name }}</option>
			</b-form-select>

			<div v-if="selectedMod">
				<!-- <h2>{{ selectedMod.name }}</h2> -->
				<module-grid v-for="mod in selectedMod.data" v-bind:key="mod.name" v-bind:mod="mod"></module-grid>
			</div>
		</div>
	</div>
</template>

<script>
import data from "@/data/data.js";
import ModuleGrid from "@/components/ModuleGrid";

export default {
	name: "ShipModule",
	components: {
		ModuleGrid
	},
	data () {
		return {
			mods: data.mods,
			selected: "",
			selectedMod: null
		};
	},
	methods: {
		selectMod: function(val) {
			this.selected = val;
			this.selectedMod = this.mods[val];
		}
	}
};
</script>

<style>

</style>
