import Vue from "vue";

// import Antd from 'ant-design-vue/dist/antd';

import App from "./App.vue";
import router from "./router";
import store from "./store";
import {Button,Layout,icon,Drawer,Radio,Menu,Form,Input} from 'ant-design-vue';//直接引入单独的样式{}
import "ant-design-vue/dist/antd.less";//引入less样式可以自定义主题
import Authorized from './components/Authorized';
import Auth from './directives/auth'

// 配置babel文件前"plugins": [
//   ["import", { "libraryName": "ant-design-vue", "libraryDirectory": "es", "style": "true" }] // `style: true` 会加载 less 文件
// ]
// import Button from "ant-design-vue/lib/button";
// import "ant-design-vue/lib/button/style"

// 配置之后 可以完成按需加载
// import { Button } from "ant-design-vue";


// Vue.config.productionTip = false;
// Vue.use(Antd);//直接引入这个包内存大，可以就用button
Vue.use(Button);
Vue.use(Layout);
Vue.use(icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Form);
Vue.use(Input);
Vue.component("Authorized",Authorized);
Vue.use(Auth);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");


