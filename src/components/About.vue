<template>
  <div class="container">
    <h1>{{ msg }}</h1>
    <p>This is very much a work in progress. Use the navigation at the top of the screen to view stuff.</p>
    <div class="row">
      <div class="col-md-6">
        <h2>To do list</h2>
        <ul>
          <li>Check data values are correct</li>
          <li>Add planet screens (levels etc), decide whether any useful calc can be done</li>
          <li>Add module priority list, drag/drop?</li>
          <li>Add read me for data</li>
          <li>Add logo</li>
        </ul>
        <h2>Github links</h2>
        <ul>
          <li>
            <a href="https://github.com/robgallen/hades-star-data-mart">Source code</a>
          </li>
        </ul>
      </div>
      <div class="col-md-6">
        <h2>Vue Js links</h2>
        <p>This is largely an exercise in learning VueJs.</p>
        <ul>
          <li>
            <a href="https://vuejs.org" target="_blank">Core Docs</a>
          </li>
          <li>
            <a href="https://forum.vuejs.org" target="_blank">Forum</a>
          </li>
          <li>
            <a href="https://chat.vuejs.org" target="_blank">Community Chat</a>
          </li>
          <li>
            <a href="https://twitter.com/vuejs" target="_blank">Twitter</a>
          </li>
          <li>
            <a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a>
          </li>
          <li>
            <a href="http://router.vuejs.org/" target="_blank">vue-router</a>
          </li>
          <li>
            <a href="http://vuex.vuejs.org/" target="_blank">vuex</a>
          </li>
          <li>
            <a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a>
          </li>
          <li>
            <a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      msg: 'Welcome to the Hades\' Star Data Mart'
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
