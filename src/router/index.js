import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
Vue.use(VueRouter);
var routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
];
var router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes,
});
export default router;
//# sourceMappingURL=index.js.map