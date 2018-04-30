<template>
  <div>
    <p>{{ level }}</p>
    <div v-for="item in chartData" v-bind:key="item.name">
      {{ item.name }} : {{ item.data }}
    </div>
  </div>
</template>

<script>
const displaySeconds = 45;

export default {
  name: 'WeaponDamageChart',
  props: {
    weapons: {
      type: Object,
      required: true
    },
    level: {
      type: Number,
      required: true
    },
    targets: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      chartData: []
    };
  },
  methods: {
    extraDamage: function (min, max, chargeTime, secs) {
      if (chargeTime) {
        var extra = (max - min) / chargeTime * secs;
        return (extra + min > max) ? max : extra;
      } else {
        return min;
      }
    },
    // also mass battery
    batteryDmg: function (minArr) {
      var arr = [];
      var dmg = minArr[this.level - 1];

      for (var i = 0; i < displaySeconds; i++) {
        arr[i] = dmg;
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
        arr[i] = dmg;
      }
      return arr;
    },
    dualLaserDmg: function (minArr, maxArr, chargeTime) {
      if (this.targets < 2) {
        return minArr[this.level - 1];
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
        arr[i] = dmg;
      }
      return arr;
    }
  },
  created () {
    for (var i = 0; i < this.weapons.data.length; i++) {
      var item = this.weapons.data[i];

      switch (item.name) {
        case 'Battery':
          this.chartData.push({
            name: item.name,
            data: this.batteryDmg(item.minDamagePerSecond)
          });
          break;
        case 'Laser':
          this.chartData.push({
            name: item.name,
            data: this.laserDmg(item.minDamagePerSecond, item.maxDamagePerSecond, item.timeToMaximumDamage)
          });
          break;
      }
    }
  }
};
</script>
