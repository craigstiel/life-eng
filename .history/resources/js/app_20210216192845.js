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

