import appLocaleData from 'react-intl/locale-data/vi';
import viMessages from '../locales/vi_VI';

const _languagues = [];
Object.keys(viMessages).forEach(languague => {
  Object.keys(viMessages[languague]).forEach(lang => {
    _languagues[lang] = viMessages[languague][lang];
  });
})

const languagues = Object.assign({}, _languagues);

const ViLang = {
  messages: {
    ...languagues
  },
  locale: 'vi-VI',
  data: appLocaleData
};
export default ViLang;