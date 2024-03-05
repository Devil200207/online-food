const BASE_URL = 'http://localhost:5000';

export const FOODS_URL = BASE_URL + '/api/foods';
export const FOODS_TAGS_URL = FOODS_URL + '/tags';
export const FOODS_BY_SEARCH_URL = FOODS_URL + '/search/';
export const FOODS_BY_TAG_URL = FOODS_URL + '/tags/';
export const FOODS_BY_ID_URL = FOODS_URL + '/';


// users api's

export const USERS_LOGIN_URL = BASE_URL + '/api/users/login';
export const USERS_REGISTER_URL = BASE_URL + '/api/users/register';


// orders api's

export const ORDERS_URL = BASE_URL + '/api/orders';
export const ORDER_CREATE_URL = ORDERS_URL + '/create';
