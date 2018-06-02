<template>
  <div class="container">
    <div class="row" v-for="ship in ships.data" v-bind:key="ship.name">
      <ships-grid v-bind:ship="ship" />
    </div>
  </div>
</template>

<script>
import data from '@/data/data.js';
import ShipsGrid from '@/components/ShipsGrid';

export default {
  name: 'Ships',
  components: {
    ShipsGrid
  },
  data () {
    return {
      ships: data.Ships
    };
  }
};
</script>

<style></style>
