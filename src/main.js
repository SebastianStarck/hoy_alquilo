import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
new Vue({
    router: router,
    store: store,
    vuetify: vuetify,
    render: function (h) { return h(App); }
}).$mount('#app');
//# sourceMappingURL=main.js.map