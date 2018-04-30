<template>
  <div id="app">
    <header>
      <div class="container">
        <div class="row">
          <b-navbar toggleable="md" type="dark">
            <b-navbar-toggle target="nav_collapse"/>
            <b-navbar-brand href="/">Data Mart</b-navbar-brand>
            <b-collapse is-nav id="nav_collapse">
              <b-navbar-nav>
                <b-nav-item to="/" exact>About</b-nav-item>
                <b-nav-item-dropdown text="Modules">
                  <b-dropdown-item to="/module" exact>Types</b-dropdown-item>
                  <b-dropdown-item to="/module/planning">Planning</b-dropdown-item>
                  <b-dropdown-item to="/module/weapon-damage">Weapon Damage</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item-dropdown text="Planets">
                  <b-dropdown-item to="/planet" exact>Types</b-dropdown-item>
                </b-nav-item-dropdown>
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
  name: 'App'
  // created () {
  //   this.$router.options.routes.forEach(route => {
  //     this.routes.push({
  //       name: route.name,
  //       path: route.path,
  //       children: route.children
  //     });
  //   });
  // },
  // data () {
  //   return {
  //     routes: []
  //   };
  // }
};
</script>

<style>
  header {
    margin-bottom: 20px;
  }
</style>
