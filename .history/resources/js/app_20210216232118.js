require('./bootstrap');
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import Vue from 'vue'
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css';
import {setupBus} from "./other/eventBus";

const opts = {
    icons: {
        iconfont: 'mdiSvg' || 'mdi' || 'md' || 'fa' || 'fa4'
    },
};

Vue.use(VueRouter);
Vue.use(Vuetify,opts);
Vue.use(VueAxios, axios);
setupBus();

import App from './components/App.vue';
import Home from './components/Home.vue';
import Register from './components/auth/Register.vue';
import Login from './components/auth/Login.vue';

axios.defaults.baseURL = '/api';

const token = localStorage.getItem("default_auth_token");
if (token) {
    axios.defaults.headers.common["Authorization"] = 'Bearer ' + token;
}

const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                title: 'LifeEng',
            },
            children: [
                {
                    path: '/register',
                    name: 'register',
                    component: Register,
                    meta: {
                        auth: false,
                        title: 'Register',
                    }
                },
                {
                    path: '/login',
                    name: 'login',
                    component: Login,
                    meta: {
                        auth: false,
                        title: 'Login',
                    }
                },
            ]
        },
    ],
});

Vue.router = router;
App.router = Vue.router;
router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next()
});

Vue.use(require('@websanova/vue-auth'), {
    auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
    http: require('@websanova/vue-auth/drivers/http/axios.js'),
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
});

Vue.directive('title', {
    inserted: (el, binding) => document.title = binding.value,
    update: (el, binding) => document.title = binding.value
});

new Vue({
    vuetify: new Vuetify(opts),
    router,
    render: h => h(App)
}).$mount("#app");