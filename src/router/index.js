import Vue from 'vue';
import Router from 'vue-router';

import About from '@/components/About';
import Module from '@/components/modules/Module';
import Damage from '@/components/modules/Damage';
import Planning from '@/components/modules/Planning';
import Planet from '@/components/planets/Planet';
import Capacity from '@/components/planets/Capacity';

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
    }, {
      path: '/module/damage',
      name: 'Damage',
      component: Damage
    }, {
      path: '/planet',
      name: 'Planets',
      component: Planet
    }, {
      path: '/planet/capacity',
      name: 'Capacity',
      component: Capacity
    }
  ]
});
