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
    about: '关于',
    share_error: '您的浏览器不支持网页分享！',
    empty: '暂无数据',
  },
  en: {
    open: 'Open',
    themeDark: 'Dark',
    themeLight: 'Light',
    title: 'CNection Recommendations',
    select_tags: 'Select Tags',
    about: 'About',
    share_error: 'Your browser does not support web sharing!',
    empty: 'No data',
  },
  de: {
    open: 'Öffnen',
    themeDark: 'Dunkel',
    themeLight: 'Hell',
    title: 'CNection Empfehlungen',
    select_tags: 'Wählen Sie Tags',
    about: 'Über',
    share_error: 'Ihr Browser unterstützt das Teilen von Webseiten nicht!',
    empty: 'Keine Daten',
  },
  ja: {
    open: '開く',
    themeDark: '暗い',
    themeLight: '明るい',
    title: 'CNectionのおすすめ',
    select_tags: 'タグを選択',
    about: '約',
    share_error: 'あなたのブラウザはウェブ共有をサポートしていません！',
    empty: 'データなし',
  },
  es: {
    open: 'Abierto',
    themeDark: 'Oscuro',
    themeLight: 'Luz',
    title: 'Recomendaciones de CNection',
    select_tags: 'Seleccionar etiquetas',
    about: 'Acerca de',
    share_error: '¡Su navegador no admite compartir sitios web!',
    empty: 'Sin datos',
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
  messages.de[element.name.en] = {
    name: element.name.de,
    desc: element.description.de,
  };
  messages.ja[element.name.en] = {
    name: element.name.ja,
    desc: element.description.ja,
  };
  messages.es[element.name.en] = {
    name: element.name.es,
    desc: element.description.es,
  };
});
console.log(messages);
const i18n = createI18n({
  locale: navigator.language, // set locale
  fallbackLocale: 'en', // set fallback locale
  messages,
  legacy: false,
});

createApp(App).use(i18n).mount('#app');
