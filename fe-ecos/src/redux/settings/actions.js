import {
  CHANGE_SIDEBAR_VISIBILITY,
  CHANGE_MOBILE_SIDEBAR_VISIBILITY,
  CHANGE_THEME_TO_DARK,
  CHANGE_THEME_TO_LIGHT,
  CHANGE_LOCALE
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
  return {
    type: CHANGE_THEME_TO_DARK,
  };
}

export function changeThemeToLight() {
  return {
    type: CHANGE_THEME_TO_LIGHT,
  };
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

