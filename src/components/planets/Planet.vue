<template>
  <div class="container">
    <h2>{{ planets.Type.name }}</h2>
    <div class="row">
      <planet-grid v-for="planet in planets.Type.data" v-bind:key="planet.name" v-bind:planet="planet"/>
    </div>
  </div>
</template>

<script>
import data from '@/data/data.js';
import PlanetGrid from '@/components/planets/PlanetGrid';

export default {
  name: 'Planet',
  components: {
    PlanetGrid
  },
  data () {
    return {
      planets: data.planets
    };
  }
};
</script>

<style>

</style>
