export const defaultStartPath = '/app/dashboards'; 
export const defaultLocale='en';
export const localeOptions=[
    {id:'en',name:'English'},
    {id:'vi',name:'Vietnamese'},
];

//api
export const apiUrl = 'http://localhost/api/v1/';
// export const apiUrl = 'http://speedlink.local/api/v1/';

//error code
export const EC_SUCCESS = 1;
export const EC_FAILURE = 0;
export const EC_FAILURE_IDENTITY_NOT_FOUND = -1;
export const EC_FAILURE_IDENTITY_AMBIGUOUS = -2;
export const EC_FAILURE_CREDENTIAL_INVALID = -3;
export const EC_FAILURE_UNCATEGORIZED = -4;
export const EC_FAILURE_AUTHENCATION = -5;

//pagination
export const SELECTED_PAGE_SIZE = 10;
export const PAGE_LIMIT = 5;
export const PAGE_SIZE = [10, 20, 50, 100];