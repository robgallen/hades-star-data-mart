<template>
  <div class="container">
    <h2>Weapon damage</h2>
    <damage-single v-bind:weapons="weapons"/>
    <damage-combined v-bind:weapons="weapons"/>
    <damage-example v-bind:weapons="weapons"/>
  </div>
</template>

<script>
import '@/highcharts.theme.js';
import data from '@/data/data.js';
import DamageSingle from '@/components/modules/DamageSingle';
import DamageCombined from '@/components/modules/DamageCombined';
import DamageExample from '@/components/modules/DamageExample';

export default {
  name: 'Damage',
  components: {
    DamageSingle,
    DamageCombined,
    DamageExample
  },
  data () {
    return {
      weapons: data.mods.Weapons
    };
  }
};
</script>
