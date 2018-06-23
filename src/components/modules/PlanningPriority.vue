<template>
  <tr>
    <td>
      <b-form-select id="selectType" v-model="type" v-on:change="selectType">
        <option v-for="t in types" v-bind:key="t.name" v-bind:value="t">{{ t.name }}</option>
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
    <td>{{ price | formatNumber }}</td>
    <td>{{ time }}</td>
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
      item: {},
      level: 1,
      price: '',
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
      { name: 'Weapon', items: data.mods.Weapons }
    ];
  },
  methods: {
    selectType: function (val) {
      this.selectedType = val;

      var typeData = val.items;
      this.upgrades = typeData.data;
    },
    selectUpgrade: function (val) {
      var itemData = this.upgrades.find(function (o) {
        return o.name === val;
      });
      this.item = itemData;

      // get level from local storage and selectLevel
      this.selectLevel(1);
    },
    selectLevel: function (val) {
      this.level = val;
      var index = val - 1;

      if (this.item.researchPrice) this.price = this.item.researchPrice[index];
      else if (this.item.upgradeCost) this.price = this.item.upgradeCost[index];
      else if (this.item.cost) this.price = this.item.cost[index];

      if (this.item.researchTime) this.time = this.item.researchTime[index];
      else if (this.item.upgradeTime) this.time = this.item.upgradeTime[index];
      else if (this.item.buildTime) this.time = this.item.buildTime[index];

      // emit new priority to parent
    }
  },
  filters: {
    formatNumber: formatter.formatNumber
  }
};
</script>

<style>

</style>
