<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <b-form-group label="Please select a module type" label-for="selectMod">
          <b-form-select id="selectMod" v-model="selected" v-on:change="selectMod">
            <option v-for="mod in mods" v-bind:key="mod.name" v-bind:value="mod.name">{{ mod.name }}</option>
          </b-form-select>
        </b-form-group>
      </div>
    </div>
    <div class="row" v-if="selectedMod">
      <module-grid v-for="mod in selectedMod.data" v-bind:key="mod.name" v-bind:mod="mod"/>
    </div>
  </div>
</template>

<script>
import data from '@/data/data.js';
import ModuleGrid from '@/components/modules/ModuleGrid';

export default {
  name: 'Module',
  components: {
    ModuleGrid
  },
  data () {
    return {
      mods: data.mods,
      selected: '',
      selectedMod: null
    };
  },
  methods: {
    selectMod: function (val) {
      this.selected = val;
      this.selectedMod = this.mods[val];
    }
  }
};
</script>

<style>

</style>
