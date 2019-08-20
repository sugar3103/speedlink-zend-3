export const defaultStartPath = '/dashboards'; 
export const defaultLocale='en';
export const localeOptions=[
    {id:'en',name:'English'},
    {id:'vi',name:'Vietnamese'},
];

//api
// export const apiUrl = 'http://speedlink.local/api/v1/';
// export const apiUrl = 'http://ecosv2-api.speedlink.local/api/v1/';
export const socketUrl = 'localhost:3000';
export const apiUrl = 'http://test.ecosv2-api.speedlink.vn/api/v1/';


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

//modal type
export const MODAL_ADD = 'add';
export const MODAL_EDIT = 'edit';
export const MODAL_VIEW = 'view';

//category pricing
export const categoryPricing = {
    1: 'Inbound',
    2: 'Outbound',
    3: 'Domestic'
}

//max size upload
export const MAX_SIZE_UPLOAD = 20; //MB