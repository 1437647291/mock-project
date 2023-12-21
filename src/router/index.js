import Vue from 'vue';
import VueRouter from 'vue-router';
import WelcomePage from '../pages/WelcomePage/WelcomePage';
import InterfacePage from '../pages/InterfacePage/InterfacePage';
import UserPage from '../pages/UserPage';
import TestPage from '../pages/TestPage';
import Login from '../pages/Login';
import Home from '../pages/Home';

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      children: [
        { path: '/welcome', component: WelcomePage },
        { path: '/interface', component: InterfacePage },
        { path: '/user', component: UserPage },
        { path: '/test', component: TestPage },
      ]
    }
  ]
});

export default router;