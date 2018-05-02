<template>
  <div>
    <p>This measures DPS on a single target, but this will change depending on the number of targets the battleship has. It is not the total DPS combined, so Mass Battery looks gimped.</p>
    <div class="row">
      <div class="col-md-3">
        <b-form-group label="Weapon level" label-for="level">
          <b-form-select id="level" v-model="level">
            <option v-for="n in 10" v-bind:key="n" v-bind:value="n">{{ n }}</option>
          </b-form-select>
        </b-form-group>
      </div>
      <div class="col-md-3">
        <b-form-group label="Targets" label-for="targets">
          <b-form-select id="targets" v-model="targets">
            <option v-for="n in 5" v-bind:key="n" v-bind:value="n">{{ n }}</option>
          </b-form-select>
        </b-form-group>
      </div>
      <div class="col-md-6">
        <label>&nbsp;</label><br>
        <b-button v-on:click="updateChart">Update</b-button>
      </div>
    </div>
    <highcharts v-bind:options="options" ref="hcSingle" />
    <br>
  </div>
</template>

<script>
import formatter from '@/components/formatter';

const displaySeconds = 51;

// chart config
var chartConfig = {
  title: {
    text: 'Single target damage',
    x: -20 // center
  },
  xAxis: {
    title: {
      text: 'Time'
    }
  },
  yAxis: {
    title: {
      text: 'Damage per second'
    },
    plotLines: [
      {
        value: 0,
        width: 1,
        color: '#808080'
      }
    ]
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle',
    borderWidth: 0
  },
  series: []
};

export default {
  name: 'DamageSingle',
  props: {
    weapons: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      level: 1,
      options: chartConfig,
      targets: 1
    };
  },
  methods: {
    updateChart: function () {
      var series = this.generateSeriesData();
      this.options.series = series;

      var chart = this.$refs.hcSingle.chart;
      chart.update({ series: series });
    },
    generateSeriesData: function () {
      var series = [];

      for (var i = 0; i < this.weapons.data.length; i++) {
        var item = this.weapons.data[i];

        switch (item.name) {
          case 'Battery':
          case 'Mass Battery':
            series.push({
              name: item.name,
              data: this.batteryDmg(item.minDamagePerSecond)
            });
            break;
          case 'Laser':
            series.push({
              name: item.name,
              data: this.laserDmg(item.minDamagePerSecond, item.maxDamagePerSecond, item.timeToMaximumDamage)
            });
            break;
          case 'Dual Laser':
            series.push({
              name: item.name,
              data: this.dualLaserDmg(item.minDamagePerSecond, item.maxDamagePerSecond, item.timeToMaximumDamage)
            });
            break;
          case 'Barrage':
            series.push({
              name: item.name,
              data: this.barrageDmg(item.minDamagePerSecond, item.maxDamagePerSecond, item.extraDamagePerEnemy)
            });
            break;
        }
      }

      return series;
    },
    // also mass battery
    batteryDmg: function (minArr) {
      var arr = [];
      var dmg = minArr[this.level - 1];

      for (var i = 0; i < displaySeconds; i++) {
        arr[i] = formatter.decimal(dmg);
      }
      return arr;
    },
    laserDmg: function (minArr, maxArr, chargeTime) {
      var arr = [];
      var min = minArr[this.level - 1];
      var max = maxArr[this.level - 1];

      for (var i = 0; i < displaySeconds; i++) {
        var extra = (max - min) / chargeTime * i;
        var dmg = (min + extra > max) ? max : min + extra;
        arr[i] = formatter.decimal(dmg);
      }
      return arr;
    },
    dualLaserDmg: function (minArr, maxArr, chargeTime) {
      if (this.targets < 2) {
        return this.batteryDmg(minArr);
      }
      return this.laserDmg(minArr, maxArr, chargeTime);
    },
    barrageDmg: function (minArr, maxArr, extraArr) {
      var arr = [];
      var min = minArr[this.level - 1];
      var max = maxArr[this.level - 1];
      var extra = extraArr[this.level - 1];

      var extraDmg = extra * this.targets;
      var dmg = (min + extraDmg > max) ? max : min + extraDmg;

      for (var i = 0; i < displaySeconds; i++) {
        arr[i] = formatter.decimal(dmg);
      }
      return arr;
    }
  },
  created () {
    var series = this.generateSeriesData();
    this.options.series = series;
  }
};
</script>
