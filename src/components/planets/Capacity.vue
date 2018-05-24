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
            <option v-for="n in 16" v-bind:key="n" v-bind:value="n">{{ n }}</option>
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
              <td>{{ row.level }}</td>
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
      planets: data.planets.Level.data,
      tabularData: []
    };
  },
  computed: {
    sumCredits () {
      var len = this.tabularData.length;
      var sum = 0;
      for (var i = 0; i < len; i++) {
        sum += this.tabularData[i].creditStorage;
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
    meanCalc: function (n, remaining) {
      var planetCredits = this.planets.creditStorage;
      var planetLevels = this.planets.level;

      // find mean
      var mean = remaining / n;
      // find index, credits, level
      var index = planetCredits.findIndex(p => {
        return (p >= mean);
      });
      // check out of range
      if (index === -1) {
        this.outOfRange = true;
        return;
      };
      var credits = planetCredits[index];
      var level = planetLevels[index];
      // half n, round up (y)
      var y = Math.ceil(n / 2);
      // total credits * y
      var total = credits * y;
      // push to data
      for (var i = 0; i < y; i++) {
        this.tabularData.push({
          level: level,
          creditStorage: credits
        });
      }
      // what's left?
      var remainder = remaining - total;
      if (remainder < 0) return;

      // loop remainder
      if (y > 1) {
        this.meanCalc(n - y, remainder);
      } else {
        var lastIndex = planetCredits.findIndex(p => {
          return (p >= remainder);
        });

        this.tabularData.push({
          level: planetLevels[lastIndex],
          creditStorage: planetCredits[lastIndex]
        });
      }
    }
  },
  filters: {
    formatNumber: formatter.formatNumber
  }
};
</script>

<style></style>
