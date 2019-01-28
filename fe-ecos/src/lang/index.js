import { addLocaleData } from 'react-intl';
import enLang from './entries/en-EN';
import viLang from './entries/vi-VI';

const AppLocale = {
    en: enLang,
    vi: viLang
};

addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.vi.data);

export default AppLocale;
