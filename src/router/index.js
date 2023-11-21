import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../pages/HomePage/HomePage';
import InterfacePage from '../pages/InterfacePage/InterfacePage';
import UserPage from '../pages/UserPage';
import TestPage from '../pages/TestPage';

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/home', component: HomePage },
    { path: '/interface', component: InterfacePage },
    { path: '/user', component: UserPage },
    { path: '/test', component: TestPage },
  ]
});

export default router;