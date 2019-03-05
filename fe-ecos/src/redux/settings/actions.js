import {
  CHANGE_SIDEBAR_VISIBILITY,
  CHANGE_MOBILE_SIDEBAR_VISIBILITY,
  CHANGE_THEME_TO_DARK,
  CHANGE_THEME_TO_LIGHT,
  CHANGE_LOCALE,
  CHANGE_THEME_TO_DARK_BLUE
} from '../../constants/actionTypes';

export function changeSidebarVisibility() {
  return {
    type: CHANGE_SIDEBAR_VISIBILITY,
  };
}

export function changeMobileSidebarVisibility() {
  return {
    type: CHANGE_MOBILE_SIDEBAR_VISIBILITY,
  };
}

export function changeThemeToDark() {
  localStorage.setItem('currentTheme', 'theme-dark');
  return {
    type: CHANGE_THEME_TO_DARK,
  };
}

export function changeThemeToLight() {
  localStorage.setItem('currentTheme', 'theme-light');
  return {
    type: CHANGE_THEME_TO_LIGHT,
  };
}
export function changeThemeToDarkBlue() {
  localStorage.setItem('currentTheme','theme-dark-blue');

  return{
    type: CHANGE_THEME_TO_DARK_BLUE
  }
}

export function changeLocale(locale) {
  localStorage.setItem('currentLanguage', locale);
  return (
    {
      type: CHANGE_LOCALE,
      payload: locale
    }
  );
}

