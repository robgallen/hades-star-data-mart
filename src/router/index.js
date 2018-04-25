import Vue from 'vue';
import Router from 'vue-router';
import About from '@/components/About';
import Module from '@/components/modules/Module';
import Planning from '@/components/modules/Planning';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'About',
      component: About
    }, {
      path: '/module',
      name: 'Modules',
      component: Module
    }, {
      path: '/module/planning',
      name: 'Planning',
      component: Planning
    }
  ]
});
