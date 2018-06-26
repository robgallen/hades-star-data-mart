<template>
  <tr>
    <td>
      <b-form-select id="selectType" v-model="type" v-on:change="selectType">
        <option v-for="t in types" v-bind:key="t.name" v-bind:value="t.name">{{ t.name }}</option>
      </b-form-select>
    </td>
    <td>
      <b-form-select id="selectUpgrade" v-model="upgrade" v-on:change="selectUpgrade">
        <option v-for="u in upgrades" v-bind:key="u.name" v-bind:value="u.name">{{ u.name }}</option>
      </b-form-select>
    </td>
    <td>
      <b-form-select id="selectLevel" v-model="level" v-on:change="selectLevel">
        <option v-for="l in item.levels" v-bind:key="l" v-bind:value="l">{{ l }}</option>
      </b-form-select>
    </td>
    <td>{{ cost | formatNumber }}</td>
    <td>{{ time }}</td>
    <td>
      <b-button v-on:click="remove" v-if="!isNew">-</b-button>
    </td>
  </tr>
</template>

<script>
import data from '@/data/data.js';
import formatter from '@/components/formatter';

export default {
  name: 'PlanningPriority',
  props: {
    priority: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      cost: '',
      item: {},
      level: 1,
      time: '',
      type: '',
      types: [],
      upgrade: '',
      upgrades: []
    };
  },
  mounted: function () {
    this.types = [
      { name: 'Mining', items: data.mods.Mining },
      { name: 'Planet', items: data.planets.Level },
      { name: 'Production', items: data.planets.Production },
      { name: 'Shields', items: data.mods.Shields },
      { name: 'Ships', items: data.Ships },
      { name: 'Support', items: data.mods.Support },
      { name: 'Trade', items: data.mods.Trade },
      { name: 'Weapons', items: data.mods.Weapons }
    ];

    if (this.priority && this.priority.name) {
      this.selectType(this.priority.type);
      this.selectUpgrade(this.priority.name);
      this.selectLevel(this.priority.level);
    } else {
      this.reset();
    }
  },
  computed: {
    isNew: function () {
      return !this.priority.name;
    }
  },
  methods: {
    add: function () {
      let priority = {
        type: this.type,
        name: this.upgrade,
        level: this.level,
        cost: this.cost
      };

      // add to master list
      this.$emit('addPriority', priority);

      // reset
      if (this.isNew) {
        window.setTimeout(() => this.reset(), 200);
      }
    },
    remove: function () {
      this.$emit('removePriority', this.upgrade);
    },
    reset: function () {
      this.type = this.upgrade = this.cost = this.time = '';
      this.level = 1;
    },
    selectType: function (val) {
      this.type = val;

      let typeData = this.types.find(function (o) {
        return o.name === val;
      });

      this.upgrades = typeData.items.data;
    },
    selectUpgrade: function (val) {
      this.upgrade = val;

      let itemData = this.upgrades.find(function (o) {
        return o.name === val;
      });
      this.item = itemData;

      // get level from local storage and selectLevel
      this.selectLevel(1);
    },
    selectLevel: function (val) {
      this.level = val;
      const index = val - 1;

      if (this.item.researchPrice) this.cost = this.item.researchPrice[index];
      else if (this.item.upgradeCost) this.cost = this.item.upgradeCost[index];
      else if (this.item.cost) this.cost = this.item.cost[index];

      if (this.item.researchTime) this.time = this.item.researchTime[index];
      else if (this.item.upgradeTime) this.time = this.item.upgradeTime[index];
      else if (this.item.buildTime) this.time = this.item.buildTime[index];

      // emit new priority to parent
      if (this.level > 1 && this.type && this.upgrade) {
        this.add();
      }
    }
  },
  filters: {
    formatNumber: formatter.formatNumber
  }
};
</script>

<style>

</style>
