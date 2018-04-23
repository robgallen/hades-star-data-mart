<template>
	<div class="shipModuleGrid">
		<h3>{{ item.name }}</h3>
		<p>{{ item.description }}<br/>
			This module is researched from {{ item.researchArtifact }} artefacts.</p>

		<table class="table table-sm">
			<thead>
				<tr>
					<th></th>
					<th v-for="level in item.levels" v-bind:key="level" class="text-right">{{ level }}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(value, key) in tabularData" v-bind:key="key">
					<td>{{ key }}</td>
					<td v-for="(val, index) in value" v-bind:key="index" class="text-right">
						{{ val | formatNumber(key) }}
					</td>
					<td v-if="singleColumn(value)" v-bind:colspan="len - 1"></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import Vue from "vue";
import numeral from "numeral";

export default {
	name: "ModuleGrid",
	props: ["mod"],
	data () {
		return {
			item: this.mod
		};
	},
	methods: {
		singleColumn: function(value) {
			if (typeof(value) === "object" && value.length === 1) {
				return true;
			};
			return false;
		}
	},
	filters: {
		"formatNumber": function(value, key) {
			if (typeof(value) === "number") {
				if (value >= 1) {
					return numeral(value).format("0,0");
				} else {
					return numeral(value).format("0.0%");
				}
			}
			return value;
		}
	},
	computed: {
		len () {
			return this.mod.levels.length;
		},

		tabularData () {
			var moduleData = this.mod;
			var tableData = {};

			Object.keys(moduleData).forEach(function(key) {
				if (key === "name" || key === "type" || key === "description" || key === "researchArtifact" || key === "levels") {
					// skip
				} else {
					// wordify key
					var keyWord = key.replace(/([A-Z])/g, " $1").replace(/^./, function(str) {
						return str.toUpperCase();
					});

					var value = moduleData[key];

					// these are in seconds
					if (key === "cooldown" || key === "effectDuration" || key === "disableTime" || key === "lifeExtension") {
						if (typeof(value) === "object") {
							for (var i = 0, len = value.length; i < len; i++) {
								var val = parseInt(value[i], 10);
								if (val > 60) {
									value[i] = numeral(val / 60).format(0.0) + "m";
								} else {
									value[i] = val + "s";
								}
							}
						} else {
							value = parseInt(value, 10) / 60 + "m";
						}
					}

					// ensure value is always an array

					if (typeof(value) !== "object") value = [value];

					tableData[keyWord] = value;
				}
			});

			return tableData;
		}
	}
};
</script>

<style scoped>

</style>
