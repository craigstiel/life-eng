require('./bootstrap');
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import Vue from 'vue'
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css';

const opts = {
    theme: {
        dark: true
    },
    icons: {
        iconfont: 'mdiSvg' || 'mdi' || 'md' || 'fa' || 'fa4'
    },
};

Vue.use(VueRouter);
Vue.use(Vuetify,opts);
Vue.use(VueAxios, axios);

axios.defaults.baseURL = '/api';

const token = localStorage.getItem("default_auth_token");
if (token) {
    axios.defaults.headers.common["Authorization"] = 'Bearer ' + token;
}