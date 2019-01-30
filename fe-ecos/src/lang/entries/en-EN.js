import appLocaleData from 'react-intl/locale-data/en';
import enMessages from '../locales/en_EN';

const _languagues = [];
Object.keys(enMessages).forEach(languague => {
  Object.keys(enMessages[languague]).forEach(lang => {
    _languagues[lang] = enMessages[languague][lang];
  });
})

const languagues = Object.assign({}, _languagues);

const EnLang = {
  messages: {
    ...languagues
  },
  locale: 'en-US',
  data: appLocaleData
};
export default EnLang;