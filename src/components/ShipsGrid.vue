<template>
  <div class="col-md-12">
    <h3>{{ item.name }}</h3>
    <p>{{ item.description }}</p>

    <table class="table table-sm">
      <thead>
        <tr>
          <th/>
          <th v-for="level in item.levels" v-bind:key="level" class="text-right">{{ level }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, key) in tabularData" v-bind:key="key">
          <td>{{ key | wordify }}</td>
          <td v-for="(val, index) in value" v-bind:key="index" class="text-right">
            {{ val | formatNumber(key) }}
          </td>
          <td v-if="singleColumn(value, item.levels)" v-bind:colspan="len - 1"/>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import formatter from '@/components/formatter';

export default {
  name: 'ShipsGrid',
  props: {
    ship: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      item: this.ship,
      ignoreKeys: ['description', 'levels', 'name', 'type']
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
      return this.ship.levels.length;
    },
    tabularData () {
      let tableData = {};

      Object.keys(this.ship).forEach(function (key) {
        if (this.ignoreKeys.includes(key)) {
          // skip
        } else {
          let value = this.ship[key];

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

<style>

</style>
