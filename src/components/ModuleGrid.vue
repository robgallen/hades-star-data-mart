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
			item: this.mod,
			ignoreKeys: ["description", "levels", "name", "researchArtifact", "type"],
			timeKeys: ["chargeTime", "cooldown", "disableTime", "effectDuration", "lifeExtension", "timeToMaximumDamage"]
		};
	},
	methods: {
		singleColumn: function(value) {
			if (typeof(value) === "object" && value.length === 1) {
				return true;
			};
			return false;
		},
		timeFormat: function(value) {
			if (value >= 60) {
				return numeral(value / 60).format(0.0) + "m";
			} else {
				return value + "s";
			}
		}
	},
	filters: {
		"formatNumber": function(value, key) {
			// keys in tabularData have been wordified
			if (typeof(value) === "number") {
				if (key === "Additional Hydrogen Use") return numeral(value).format("0.0");
				if (value >= 1) return numeral(value).format("0,0");
				else return numeral(value).format("0.0%");
			}
			return value;
		}
	},
	computed: {
		len () {
			return this.mod.levels.length;
		},
		tabularData () {
			var tableData = {};

			Object.keys(this.mod).forEach(function(key) {
				if (this.ignoreKeys.includes(key)) {
					// skip
				} else {
					// wordify key
					var keyWord = key.replace(/([A-Z])/g, " $1").replace(/^./, function(str) {
						return str.toUpperCase();
					});

					var value = this.mod[key];

					// these are in seconds
					if (this.timeKeys.includes(key)) {
						if (typeof(value) === "object") {
							for (var i = 0, len = value.length; i < len; i++) {
								var val = parseInt(value[i], 10);
								value[i] = this.timeFormat(val);
							}
						} else {
							value = this.timeFormat(value);
						}
					}

					// ensure value is always an array

					if (typeof(value) !== "object") value = [value];

					tableData[keyWord] = value;
				}
			}, this);

			return tableData;
		}
	}
};
</script>

<style scoped>

</style>
