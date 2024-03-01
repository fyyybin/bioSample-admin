import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { createPinia } from 'pinia';
import piniaPluginPersist from 'pinia-plugin-persistedstate';
import vue3SeamlessScroll from 'vue3-seamless-scroll';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersist);
// register the element Icons component
Object.keys(ElementPlusIconsVue).forEach((key) => {
    app.component(key, ElementPlusIconsVue[key as keyof typeof ElementPlusIconsVue]);
});

app.use(ElementPlus).use(router).use(vue3SeamlessScroll).use(pinia).mount('#app');
