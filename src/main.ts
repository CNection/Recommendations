import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n';
import data from './data.json';

interface Language {
  [key: string]: string | { [key: string]: string };
}

interface Messages {
  [key: string]: Language;
}

let messages: Messages = {
  zh: {
    open: '打开网站',
    themeDark: '暗色',
    themeLight: '亮色',
    title: '交汇中国 资源推荐',
    select_tags: '选择标签',
  },
  en: {
    open: 'Open',
    themeDark: 'Dark',
    themeLight: 'Light',
    title: 'CNection Recommendations',
    select_tags: 'Select Tags',
  },
};

data.forEach(element => {
  messages.zh[element.name.en] = {
    name: element.name.zh,
    desc: element.description.zh,
  };
  messages.en[element.name.en] = {
    name: element.name.en,
    desc: element.description.en,
  };
});
console.log(messages);
const i18n = createI18n({
  locale: navigator.language, // set locale
  fallbackLocale: 'en', // set fallback locale
  messages,
});

createApp(App).use(i18n).mount('#app');
