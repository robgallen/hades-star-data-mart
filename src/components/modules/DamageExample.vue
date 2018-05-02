<template>
  <div id="damageExample">
    <p>This is an example of showing combined DPS during a fight, with various ships being destroyed at different times. There are 4 targets initially, and they get destroyed after <span v-for="(time, index) in shipDestruction" v-bind:key="index">{{ time - 1 }}<span v-if="index+2 < shipDestruction.length">, </span><span v-if="index+2 === shipDestruction.length"> and </span></span> seconds.</p>
    <div class="row">
      <div class="col-md-3">
        <b-form-group label="Weapon level" label-for="level">
          <b-form-select id="level" v-model="level">
            <option v-for="n in 10" v-bind:key="n" v-bind:value="n">{{ n }}</option>
          </b-form-select>
        </b-form-group>
      </div>
      <div class="col-md-6">
        <label>&nbsp;</label><br>
        <b-button v-on:click="updateChart">Update</b-button>
      </div>
    </div>
    <highcharts v-bind:options="options" ref="hcExample" />
    <br>
  </div>
</template>

<script>
import formatter from '@/components/formatter';

const displaySeconds = 31;

// chart config
var chartConfig = {
  title: {
    text: 'Combined damage - Example',
    x: -20 // center
  },
  xAxis: {
    title: {
      text: 'Time'
    },
    plotLines: [{
      color: '#FF0000',
      label: { text: '3 targets', verticalAlign: 'bottom', textAlign: 'right', style: { color: '#fff' } },
      width: 1,
      value: 6
    }, {
      color: '#FF0000',
      label: { text: '2 targets', verticalAlign: 'bottom', textAlign: 'right', style: { color: '#fff' } },
      width: 1,
      value: 10
    }, {
      color: '#FF0000',
      label: { text: '1 target', verticalAlign: 'bottom', textAlign: 'right', style: { color: '#fff' } },
      width: 1,
      value: 20
    }]
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
  name: 'DamageExample',
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
      targets: 4,
      shipDestruction: [7, 11, 21, 31]
    };
  },
  methods: {
    updateChart: function () {
      var series = this.generateSeriesData();
      this.options.series = series;

      var chart = this.$refs.hcExample.chart;
      chart.update({ series: series });

      document.getElementById('damageExample').scrollIntoView(true);
    },
    generateSeriesData: function () {
      var series = [];

      for (var i = 0; i < this.weapons.data.length; i++) {
        var item = this.weapons.data[i];

        switch (item.name) {
          case 'Battery':
            series.push({
              name: item.name,
              data: this.batteryDmg(item.minDamagePerSecond)
            });
            break;
          case 'Mass Battery':
            series.push({
              name: item.name,
              data: this.massBatteryDmg(item.minDamagePerSecond, item.maxTargets)
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
              data: this.dualLaserDmg(item.minDamagePerSecond, item.maxDamagePerSecond, item.timeToMaximumDamage, item.maxTargets)
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
    batteryDmg: function (minArr) {
      var arr = [];
      var dmg = minArr[this.level - 1];

      for (var i = 0; i < displaySeconds; i++) {
        arr[i] = formatter.decimal(dmg);
      }
      return arr;
    },
    massBatteryDmg: function (minArr, targetArr) {
      var arr = [];
      var dmg = minArr[this.level - 1];
      var maxTargets = targetArr[this.level - 1];
      var i = 0;

      for (var x = 0; x < this.shipDestruction.length; x++) {
        var t = this.shipDestruction[x];
        this.targets = 4 - x;
        var multiplier = (this.targets > maxTargets) ? maxTargets : this.targets;

        do {
          arr[i] = formatter.decimal(dmg * multiplier);
          i++;
        } while (i < t);
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
    dualLaserDmg: function (minArr, maxArr, chargeTime, maxTargets) {
      var arr = [];
      var min = minArr[this.level - 1];
      var max = maxArr[this.level - 1];
      var i = 0;

      for (var x = 0; x < this.shipDestruction.length; x++) {
        var t = this.shipDestruction[x];
        this.targets = 4 - x;
        var multiplier = (this.targets > maxTargets) ? maxTargets : this.targets;

        do {
          if (this.targets < 2) {
            arr[i] = formatter.decimal(min);
          } else {
            var extra = (max - min) / chargeTime * i;
            var dmg = (min + extra > max) ? max : min + extra;
            arr[i] = formatter.decimal(dmg * multiplier);
          }
          i++;
        } while (i < t);
      }
      return arr;
    },
    barrageDmg: function (minArr, maxArr, extraArr) {
      var arr = [];
      var min = minArr[this.level - 1];
      var max = maxArr[this.level - 1];
      var extra = extraArr[this.level - 1];
      var i = 0;

      for (var x = 0; x < this.shipDestruction.length; x++) {
        var t = this.shipDestruction[x];
        this.targets = 4 - x;
        var extraDmg = extra * this.targets;
        var dmg = (min + extraDmg > max) ? max : min + extraDmg;

        do {
          arr[i] = formatter.decimal(dmg);
          i++;
        } while (i < t);
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
