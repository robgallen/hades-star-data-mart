<template>
  <div id="app">
    <header>
      <div class="container">
        <div class="row">
          <b-navbar toggleable="md" type="dark">
            <b-navbar-toggle target="nav_collapse"/>
            <b-navbar-brand href="/">Data Mart</b-navbar-brand>
            <b-collapse is-nav id="nav_collapse">
              <b-navbar-nav v-for="route in routes" v-bind:key="route.name">
                <b-nav-item v-bind:to="route.path">{{ route.name }}</b-nav-item>
              </b-navbar-nav>
            </b-collapse>
          </b-navbar>
        </div>
      </div>
    </header>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    this.$router.options.routes.forEach(route => {
      this.routes.push({
        name: route.name,
        path: route.path
      });
    });
  },
  data () {
    return {
      routes: []
    };
  }
};
</script>

<style>
  body {
    font-size: 0.8em;
  }
  header {
    margin-bottom: 20px;
  }
</style>
