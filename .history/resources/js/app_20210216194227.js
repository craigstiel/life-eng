require('./bootstrap');
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import Vue from 'vue'
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css';

Vue.use(VueRouter);
Vue.use(Vuetify,opts);
Vue.use(VueAxios, axios);

import App from './components/App';
import Home from './components/Home';

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
                title: 'Contact manager',
            },
            children: [
                {
                    path: '/contacts',
                    name: 'contacts',
                    component: Contacts,
                    meta: {
                        auth: true,
                        title: 'Contacts',
                    }
                },
                {
                    path: '/management',
                    name: 'management',
                    component: Management,
                    meta: {
                        auth: true,
                        title: 'Management',
                    }
                },
                {
                    path: '/history',
                    name: 'history',
                    component: History,
                    meta: {
                        auth: true,
                        title: 'History',
                    }
                },
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
    http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
});
