import { addLocaleData } from 'react-intl';
import enLang from './entries/en-EN';
import viLang from './entries/vi-VI';
import 'moment-timezone';
import 'moment/locale/vi';
import 'moment/locale/en-gb';

const AppLocale = {
    en: enLang,
    vi: viLang
};

addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.vi.data);

export default AppLocale;
