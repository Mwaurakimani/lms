import App from './App.vue'
import {createApp} from 'vue'
import { createPinia } from 'pinia'
import {axiosPlugin} from "@/plugin/axiosPlugin.js";
import router from './router'
import "bootstrap-icons/font/bootstrap-icons.css"

import $ from 'jquery';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import './assets/main.css'
import './assets/css/index.css'
import './assets/scss/index.scss'

window.$ = $;

const app = createApp(App)

app.use(createPinia())
app.use(axiosPlugin)
app.use(router)

app.config.productionTip = false;

app.mount('#app')