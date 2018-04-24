<template>
	<div class="form-row">
		<div class="col-md-5">
			<input v-bind:value="item.name" type="text" readonly class="form-control-plaintext" />
		</div>
		<div class="col-md-3">
			<b-form-select v-model="level" v-bind:options="levels" size="sm" />
		</div>
		<div class="col-md-3">
			<input v-bind:value="nextResearchCost" type="text" readonly class="form-control-plaintext text-right" />
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
