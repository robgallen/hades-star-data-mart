<template>
	<div class="form-row">
		<div class="col">
			{{ item.name }}
		</div>
		<div class="col">
			<b-form-select v-model="level" v-bind:options="levels" />
		</div>
		<div class="col text-right">
			{{ nextResearchCost }}
		</div>
	</div>
</template>

<script>
import numeral from "numeral";

export default {
	name: "PlanningRow",
	props: ["mod"],
	data () {
		return {
			item: this.mod,
			level: 0
		};
	},
	computed: {
		levels () {
			return [0].concat(this.item.levels);
		},
		nextResearchCost () {
			var price = this.item.researchPrice[this.level];
			if (price) return numeral(price).format("0,0");
			else return "";
		}
	}
};
</script>

<style>

</style>
