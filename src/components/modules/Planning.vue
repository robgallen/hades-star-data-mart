<template>
  <div class="container">
    <p>Use this to help plan your next upgrade. Enter the level your module is currently at, and it will tell you how much the <strong>next</strong> upgrade will cost.<br>Your values will be stored in local storage for the next time you visit.</p>
    <div class="row">
      <div class="col-md-4">
        <h2>{{ mods.Trade.name }}</h2>
        <planning-row v-for="mod in mods.Trade.data" v-bind:key="mod.name" v-bind:mod="mod" v-on:addPriority="pushPriority" />
        <h2>{{ mods.Mining.name }}</h2>
        <planning-row v-for="mod in mods.Mining.data" v-bind:key="mod.name" v-bind:mod="mod" v-on:addPriority="pushPriority" />
      </div>
      <div class="col-md-4">
        <h2>{{ mods.Weapons.name }}</h2>
        <planning-row v-for="mod in mods.Weapons.data" v-bind:key="mod.name" v-bind:mod="mod" v-on:addPriority="pushPriority" />
        <h2>{{ mods.Shields.name }}</h2>
        <planning-row v-for="mod in mods.Shields.data" v-bind:key="mod.name" v-bind:mod="mod" v-on:addPriority="pushPriority" />
      </div>
      <div class="col-md-4">
        <h2>{{ mods.Support.name }}</h2>
        <planning-row v-for="mod in mods.Support.data" v-bind:key="mod.name" v-bind:mod="mod" v-on:addPriority="pushPriority" />
      </div>
    </div>
    <!-- <hr>
    <h3>Priorities</h3>
    <p>Click an item to add it to your <b-link href="#" v-b-modal.priorityList>priority list</b-link>. You can have up to 5 items to ponder over.</p>
    <b-modal id="priorityList" title="Priorities" ok-only>
      <div class="row" v-for="item in priorities" v-bind:key="item.name">
        {{ item.name }}
      </div>
      <p v-if="priorities.length === 0">You have no priorities set right now.</p>
    </b-modal> -->
  </div>
</template>

<script>
import data from '@/data/data.js';
import PlanningRow from '@/components/modules/PlanningRow';

export default {
  name: 'Planning',
  components: {
    PlanningRow
  },
  data () {
    return {
      mods: data.mods,
      priorities: []
    };
  },
  methods: {
    pushPriority: function (item) {
      // check whether already in array
      var len = this.priorities.length;
      while (len--) {
        if (this.priorities[len] === item) return;
      }

      // add to end of the array
      this.priorities.push(item);
      if (this.priorities.length > 5) {
        // remove from start of the array
        this.priorities.shift();
      }
    }
  }
};
</script>

<style>

</style>
