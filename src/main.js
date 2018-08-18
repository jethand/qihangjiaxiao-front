import Vue from 'vue';
import iView from 'iview';
import {router} from './router/index';
import {appRouter} from './router/router';
import store from './store';
import App from './app.vue';
import '@/locale';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import util from './libs/util';

import "@/styles/component.less"

import axios from 'axios'
Vue.prototype.$http = axios;
axios.interceptors.response.use(config => {
    if(config.data.errno !== 0){
        iView.Message.warning("用户未登录！");
        const URL = window.location.protocol + '//' + window.location.host + '/#/login';
        window.location.href = URL;
    }
    return config
});
import filter from '@/filter'
Vue.use(VueI18n);
Vue.use(iView);

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted () {
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        //this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        // 权限菜单过滤相关
        //this.$store.commit('updateMenulist');
        // iview-admin检查更新
        //util.checkUpdate(this);
    },
    created () {
        
    }
});
