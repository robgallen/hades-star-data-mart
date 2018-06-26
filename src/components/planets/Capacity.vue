<template>
  <div class="container">
    <h2>Capacity planning</h2>
    <p>What level planets you will need, depending on the amount of planets you currently have.</p>
    <form>
      <div class="form-row">
        <div class="form-group col-md-3">
          <label for="capacityReq">Capacity required</label>
          <input v-model="capacityReq" type="number" class="form-control" id="capacityReq">
        </div>
        <div class="form-group col-md-2">
          <label for="planetCount">Number of planets</label>
          <b-form-select id="planetCount" v-model="planetCount">
            <option v-for="n in range(8, 16)" v-bind:key="n" v-bind:value="n">{{ n }}</option>
          </b-form-select>
        </div>
        <div class="form-group col-md-2">
          <label>&nbsp;</label><br>
          <b-button v-on:click="calculateCapacity">Update</b-button>
        </div>
      </div>
    </form>
    <div class="row" v-if="tabularData.length">
      <div class="col-md-12">
        <table class="table table-sm">
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>Planet level</th>
              <th>Credit storage</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in tabularData" v-bind:key="index">
              <td>{{ index + 1 }}</td>
              <td>
                <b-form-select v-model="row.level" v-on:change="updateRow(index, $event)">
                  <option v-for="x in limit(index)" v-bind:key="x" v-bind:value="x">{{ x }}</option>
                </b-form-select>
              </td>
              <td>{{ row.creditStorage | formatNumber }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td><strong>{{ sumCredits | formatNumber }}</strong></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <p v-show="outOfRange">I'm sorry Dave, I'm afraid I can't do that.</p>
  </div>
</template>

<script>
import data from '@/data/data.js';
import formatter from '@/components/formatter';

export default {
  name: 'Capacity',
  data () {
    return {
      capacityReq: 225000,
      outOfRange: false,
      planetCount: 8,
      planets: data.planets.Level.data[0],
      tabularData: []
    };
  },
  computed: {
    sumCredits () {
      let len = this.tabularData.length;
      let sum = 0;
      while (len--) {
        sum += this.tabularData[len].creditStorage;
      }
      return sum;
    }
  },
  methods: {
    calculateCapacity: function () {
      if (isNaN(this.capacityReq)) return;

      this.tabularData = [];
      this.outOfRange = false;
      this.meanCalc(this.planetCount, this.capacityReq);
    },
    limit: function (i) {
      // first 4 planets are capped at lvl 15, etc.
      if (i < 4) return 15;
      if (i < 5) return 20;
      // TODO: not sure when lvl 30 limit is reached
      if (i < 8) return 30;
      return 40;
    },
    meanCalc: function (n, remaining) {
      const planetCredits = this.planets.creditStorage;
      const planetLevels = this.planets.levels;

      // find mean
      const mean = remaining / n;
      // find index, credits, level
      let index = planetCredits.findIndex(p => {
        return (p >= mean);
      });
      // check out of range
      if (index === -1) {
        this.outOfRange = true;
        return;
      };

      // first 4 planets are limited to lvl 15
      if (this.tabularData.length < 4 && index > 14 && n >= 4) {
        index = 14;
      }
      // TODO: 5th planet should be lvl 20 max

      const credits = planetCredits[index];
      const level = planetLevels[index];

      // half n, round up (y)
      const y = Math.ceil(n / 2);
      // total credits * y
      const total = credits * y;
      // push to data
      for (var i = 0; i < y; i++) {
        this.tabularData.push({
          level: level,
          creditStorage: credits
        });
      }
      // what's left?
      const remainder = remaining - total;
      if (remainder < 0) return;

      // loop remainder
      if (y > 1) {
        this.meanCalc(n - y, remainder);
      } else {
        const lastIndex = planetCredits.findIndex(p => {
          return (p >= remainder);
        });

        this.tabularData.push({
          level: planetLevels[lastIndex],
          creditStorage: planetCredits[lastIndex]
        });
      }
    },
    range: function (start, end) {
      return Array(end - start + 1).fill().map((_, idx) => start + idx);
    },
    updateRow: function (i, level) {
      const planetCredits = this.planets.creditStorage;

      const credits = planetCredits[level - 1];
      if (credits) {
        this.tabularData[i].creditStorage = credits;
      }
    }
  },
  filters: {
    formatNumber: formatter.formatNumber
  }
};
</script>

<style scoped>
.table-sm select {
  width: 50%;
}
</style>
