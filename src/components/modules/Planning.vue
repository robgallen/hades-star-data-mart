<template>
  <div class="container">
    <b-tabs>
      <b-tab title="Upgrades" class="planningView">
        <br>
        <p>Use this to help plan your next upgrade. Enter the level your module is currently at, and it will tell you how much the <strong>next</strong> upgrade will cost.<br>Your values will be stored in local storage for the next time you visit.</p>
        <div class="row">
          <div class="col-md-4">
            <h2>{{ mods.Trade.name }}</h2>
            <planning-row v-for="mod in mods.Trade.data" v-bind:key="mod.name" v-bind:mod="mod" />
            <h2>{{ mods.Mining.name }}</h2>
            <planning-row v-for="mod in mods.Mining.data" v-bind:key="mod.name" v-bind:mod="mod" />
          </div>
          <div class="col-md-4">
            <h2>{{ mods.Weapons.name }}</h2>
            <planning-row v-for="mod in mods.Weapons.data" v-bind:key="mod.name" v-bind:mod="mod" />
            <h2>{{ mods.Shields.name }}</h2>
            <planning-row v-for="mod in mods.Shields.data" v-bind:key="mod.name" v-bind:mod="mod" />
          </div>
          <div class="col-md-4">
            <h2>{{ mods.Support.name }}</h2>
            <planning-row v-for="mod in mods.Support.data" v-bind:key="mod.name" v-bind:mod="mod" />
          </div>
        </div>
      </b-tab>
      <b-tab title="Priorities">
        <br>
        <p v-if="priorities.length === 0">You have no priorities set right now.</p>
        <table class="table" v-if="priorities.length > 0">
          <thead>
            <tr>
              <th>Type</th>
              <th>Upgrade</th>
              <th>Next level</th>
              <th>Cost</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            <planning-priority v-for="priority in priorities" v-bind:key="priority.name" v-bind:priority="priority" />
          </tbody>
        </table>
        <b-button v-on:click="addPriority">Add priority</b-button>
        <br>
        <p>TODO: use local storage and sync with Upgrades tab. add drag/drop re-order</p>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import data from '@/data/data.js';
import PlanningRow from '@/components/modules/PlanningRow';
import PlanningPriority from '@/components/modules/PlanningPriority';

export default {
  name: 'Planning',
  components: {
    PlanningRow,
    PlanningPriority
  },
  data () {
    return {
      mods: data.mods,
      priorities: []
    };
  },
  methods: {
    addPriority: function () {
      this.priorities.push({
        name: 'new'
      });
    }
  }
};
</script>

<style>
  .planningView input, .planningView select {
    font-size: 90%;
  }
</style>
