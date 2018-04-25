<template>
  <div class="container">
    <p>Use this to help plan your next upgrade. Enter the level your module is currently at, and it will tell you how much the <strong>next</strong> upgrade will cost.</p>
    <div class="row">
      <div class="col-md-4">
        Trade / Mining todo
      </div>
      <div class="col-md-4">
        <h2>{{ mods.Weapons.name }}</h2>
        <planning-row v-for="mod in mods.Weapons.data" v-bind:key="mod.name" v-bind:mod="mod"></planning-row>
        <h2>{{ mods.Shields.name }}</h2>
        <planning-row v-for="mod in mods.Shields.data" v-bind:key="mod.name" v-bind:mod="mod"></planning-row>
      </div>
      <div class="col-md-4">
        <h2>{{ mods.Support.name }}</h2>
        <planning-row v-for="mod in mods.Support.data" v-bind:key="mod.name" v-bind:mod="mod"></planning-row>
      </div>
    </div>
  </div>
</template>

<script>
import data from "@/data/data.js";
import PlanningRow from "@/components/modules/PlanningRow";

export default {
  name: "Planning",
  components: {
    PlanningRow
  },
  data () {
    return {
      mods: data.mods
    };
  }
};
</script>

<style>

</style>
