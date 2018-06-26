<template>
  <div class="col-md-12">
    <h3>{{ item.name }}</h3>
    <p>{{ item.description }}</p>

    <table class="table table-sm">
      <thead>
        <tr>
          <th/>
          <th v-for="level in item.tiers" v-bind:key="level" class="text-right">{{ level }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, key) in tabularData" v-bind:key="key">
          <td>{{ key | wordify }}</td>
          <td v-for="(val, index) in value" v-bind:key="index" class="text-right">
            {{ val | formatNumber(key) }}
          </td>
          <td v-if="singleColumn(value, item.tiers)" v-bind:colspan="len - 1"/>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import formatter from '@/components/formatter';

export default {
  name: 'PlanetGrid',
  props: {
    planet: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      item: this.planet,
      ignoreKeys: ['description', 'tiers', 'name']
    };
  },
  methods: {
    singleColumn: formatter.singleColumn,
    timeFormat: formatter.timeFormat
  },
  filters: {
    formatNumber: formatter.formatNumber,
    wordify: formatter.wordify
  },
  computed: {
    len () {
      return this.planet.tiers.length;
    },
    tabularData () {
      let tableData = {};

      Object.keys(this.planet).forEach(function (key) {
        if (this.ignoreKeys.includes(key)) {
          // skip
        } else {
          let value = this.planet[key];

          // ensure value is always an array
          if (typeof (value) !== 'object') value = [value];

          tableData[key] = value;
        }
      }, this);

      return tableData;
    }
  }
};
</script>

<style scoped>

</style>
