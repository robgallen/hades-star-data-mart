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
        <table class="table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Upgrade</th>
              <th>Next level</th>
              <th>Cost</th>
              <th>Duration</th>
              <th/>
            </tr>
          </thead>
          <tbody>
            <planning-priority v-bind:priority="{}" v-on:addPriority="addPriority" />
            <planning-priority v-for="priority in priorities" v-bind:key="priority.name" v-bind:priority="priority" v-on:addPriority="addPriority" v-on:removePriority="removePriority" />
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3">&nbsp;</td>
              <td><strong v-if="priorities.length">{{ totalCost | formatNumber }}</strong></td>
              <td colspan="2">&nbsp;</td>
            </tr>
          </tfoot>
        </table>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import data from '@/data/data.js';
import formatter from '@/components/formatter';
import PlanningRow from '@/components/modules/PlanningRow';
import PlanningPriority from '@/components/modules/PlanningPriority';

const storageKey = 'priorityPlanning';

export default {
  name: 'Planning',
  components: {
    PlanningRow,
    PlanningPriority
  },
  data () {
    return {
      mods: data.mods,
      priorities: [],
      totalCost: 0
    };
  },
  mounted () {
    if (window.localStorage && window.localStorage.getItem(storageKey)) {
      var priorityPlanning = JSON.parse(window.localStorage.getItem(storageKey));
      this.priorities = priorityPlanning;
    }
  },
  methods: {
    addPriority: function (item) {
      // check whether already in array
      var len = this.priorities.length;
      var found = false;

      while (len--) {
        if (this.priorities[len].name === item.name) {
          this.priorities[len] = item;
          found = true;
        };
      }

      // add to array
      if (!found) {
        this.priorities.push(item);
      }

      this.storePriorities();
      this.sumCost();
    },
    newPriority: function () {
      this.priorities.push({});
    },
    removePriority: function (name) {
      // this will remove all 'planets' etc.
      var reducedList = this.priorities.filter(p => p.name !== name);
      this.priorities = reducedList;

      this.storePriorities();
    },
    storePriorities: function () {
      if (window.localStorage) {
        var priorityPlanning = this.priorities.filter(p => p.name !== null);
        window.localStorage.setItem(storageKey, JSON.stringify(priorityPlanning));
      }
    },
    sumCost: function () {
      var len = this.priorities.length;
      var sum = 0;
      for (var i = 0; i < len; i++) {
        sum += this.priorities[i].cost;
      }
      this.totalCost = sum;
    }
  },
  filters: {
    formatNumber: formatter.formatNumber
  }
};
</script>

<style>
  .planningView input, .planningView select {
    font-size: 90%;
  }
</style>
