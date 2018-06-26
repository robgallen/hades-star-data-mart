<template>
  <div class="col-md-12">
    <h3>{{ item.name }}</h3>
    <p>{{ item.description }}<br>
      This module is researched from {{ item.researchArtifact }} artefacts.</p>

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
  name: 'ModuleGrid',
  props: {
    mod: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      item: this.mod,
      ignoreKeys: ['description', 'levels', 'name', 'researchArtifact', 'type'],
      timeKeys: ['chargeTime', 'cooldown', 'disableTime', 'effectDuration', 'lifeExtension', 'timeToMaximumDamage']
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
      return this.mod.levels.length;
    },
    tabularData () {
      let tableData = {};

      Object.keys(this.mod).forEach(function (key) {
        if (this.ignoreKeys.includes(key)) {
          // skip
        } else {
          let value = this.mod[key];

          // these are in seconds
          if (this.timeKeys.includes(key)) {
            if (typeof (value) === 'object') {
              for (var i = 0, len = value.length; i < len; i++) {
                var val = parseInt(value[i], 10);
                value[i] = this.timeFormat(val);
              }
            } else {
              value = this.timeFormat(value);
            }
          }

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
