import { 
  CHANGE_SIDEBAR_VISIBILITY, 
  CHANGE_MOBILE_SIDEBAR_VISIBILITY,
  CHANGE_THEME_TO_DARK,
  CHANGE_THEME_TO_LIGHT,
  CHANGE_LOCALE
} from '../../constants/actionTypes';
import {defaultLocale,localeOptions} from '../../constants/defaultValues'

const initialState = {
  sidebar: {
    show: false,
    collapse: false,
  },
  theme: {
    className: localStorage.getItem('currentTheme') ? localStorage.getItem('currentTheme') : ''
  },
  locale: (localStorage.getItem('currentLanguage') && localeOptions.filter(x=>x.id === localStorage.getItem('currentLanguage')).length>0) ? localStorage.getItem('currentLanguage') : defaultLocale,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_SIDEBAR_VISIBILITY:
      return { 
        ...state, 
        sidebar: {
          ...state.sidebar,
          collapse: !state.sidebar.collapse 
        }
      };
    case CHANGE_MOBILE_SIDEBAR_VISIBILITY:
      return { 
        ...state, 
        sidebar: {
          ...state.sidebar,
          show: !state.sidebar.show 
        }
      };
    case CHANGE_THEME_TO_DARK:
      return {
        ...state,
        theme: { className: 'theme-dark'}
      }
    case CHANGE_THEME_TO_LIGHT:
    return {
      ...state,
      theme: { className: 'theme-light'}
    }
    case CHANGE_LOCALE: 
      return {
        ...state,
        locale: action.payload
      }
    default:
      return state;
  }
}
