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
import numeral from 'numeral';

const storageKey = 'modulePlanning';

export default {
  name: 'PlanningRow',
  props: ['mod'],
  mounted () {
    if (window.localStorage && window.localStorage.getItem(storageKey)) {
      var modulePlanning = JSON.parse(window.localStorage.getItem(storageKey));
      var lvl = modulePlanning[this.item.name];
      if (lvl > 0) this.level = lvl;
    }
  },
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
      if (price) return numeral(price).format('0,0');
      else return '';
    }
  },
  watch: {
    level: {
      handler () {
        if (window.localStorage) {
          var modulePlanning = JSON.parse(window.localStorage.getItem(storageKey)) || {};
          modulePlanning[this.item.name] = this.level;
          window.localStorage.setItem(storageKey, JSON.stringify(modulePlanning));
        }
      }
    }
  }
};
</script>

<style>

</style>
