export const defaultMenuType = 'menu-default'; // 'menu-default', 'menu-sub-hidden', 'menu-hidden';
export const defaultStartPath = '/app/dashboards'; 
export const subHiddenBreakpoint=1440;
export const menuHiddenBreakpoint = 768;
export const defaultLocale='en';
export const localeOptions=[
    {id:'en',name:'English'},
    {id:'vi',name:'Vietnamese'},
];
export const searchPath = "/app/layouts/search";

//api
export const apiUrl = 'http://localhost';

//error code
export const EC_SUCCESS = 1;
export const EC_FAILURE = 0;
export const EC_FAILURE_IDENTITY_NOT_FOUND = -1;
export const EC_FAILURE_IDENTITY_AMBIGUOUS = -2;
export const EC_FAILURE_CREDENTIAL_INVALID = -3;
export const EC_FAILURE_UNCATEGORIZED = -4;
export const EC_FAILURE_AUTHENCATION = -5;

//pagination
export const SELECTED_PAGE_SIZE = 5;
export const PAGE_SIZE = [5, 10, 15, 20];