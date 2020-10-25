import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

Vue.config.productionTip = false;

const numeral = require('numeral');

Vue.filter(
    'formatMoney',
    (value) => {
        return numeral(value).format('$0,0.[00]');
    }
);

Vue.use(require('vue-moment'));

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
