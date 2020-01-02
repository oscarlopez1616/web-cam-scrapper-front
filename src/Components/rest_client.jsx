import axios from 'axios';
import {LoginMapper} from 'web-cam-scrapper-front/src/LoginMapper';

const md5 = require('md5');

var COOKIE_LOGIN_NAME = 'scrapper';

const clientPublicAuthId = '2a9ac062-e94e-4e2d-a514-f2620f94009e';
export const loginBorrowerUser = 'superadmin@auditor-framework.com';
export const loginBorrowerPass = '123456';
const md5BorrowerUser = md5(loginBorrowerUser);
export const clientPublicAuth = btoa(`${clientPublicAuthId}:${md5BorrowerUser}`);
const apiBase = '/api';
const apiUrl = "http://localhost/api";
const apiTokenUrl = apiUrl + '/token';

const getAuthorizationConfig = () => {
    const apiToken = localStorage.getItem(window.RUNTIME_COOKIE_NAME || COOKIE_LOGIN_NAME);
    if (apiToken) {
        const token = JSON.parse(apiToken);
        return {
            'Access-Control-Allow-Origin': '*',
            Authorization: token.token
        };
    }
    return {};
};

const requestRefreshAuthorization = (service, dispatch, action) => {
    let apiToken = localStorage.getItem(window.RUNTIME_COOKIE_NAME);
    apiToken = JSON.parse(apiToken);
    let data = {
        refresh_token: apiToken.refresh_token,
        grant_type: 'refresh_token'
    };

    data = LoginMapper.dehydrate(data);

    const configRequest = {
        method: 'post',
        credentials: 'same-origin',
        headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Basic ${clientPublicAuth}`
        },
        name: 'account:refreshToken',
        url: `${apiTokenUrl}`,
        data
    };

    axios(configRequest.url, configRequest)
        .then((res) => {
            const token = LoginMapper.hydrate(res.data);
            localStorage.removeItem(window.RUNTIME_COOKIE_NAME || COOKIE_LOGIN_NAME);
            localStorage.setItem(window.RUNTIME_COOKIE_NAME || COOKIE_LOGIN_NAME, JSON.stringify(token));
            const req = requestApi(service);
            dispatch(action(req));
        })
        .catch((error) => {
            if (error.response.status === 401) {
                localStorage.removeItem(window.RUNTIME_COOKIE_NAME || COOKIE_LOGIN_NAME);
                window.location = '/application/unauthorized';
            } else {
                throw error;
            }
        });
};

const request = (
    url,
    isJSON,
    service,
    dispatch,
    action
) => {
    const configRequest = {
        method: service.method,
        credentials: 'same-origin',
        'Access-Control-Allow-Origin': '*',
        headers: Object.assign(
            isJSON && !service.formData ? ({
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }) : ({}),
            getAuthorizationConfig(),
            service.headers
        ),
        name: service.name,
        url: service.extern ? `${service.route}` : (service.public ? `${apiBase}${service.route}` : `${apiUrl}${service.route}`)
    };

    if ((service.method === 'post' || service.method === 'put' || service.method === 'patch')) {
        configRequest.data = isJSON && !service.formData ? JSON.stringify(service.body) : service.body;
    }
    return axios(configRequest.url, configRequest)
        .then(response => response)
        .catch((error) => {
            if (error.response.status === 401) {
                requestRefreshAuthorization(service, dispatch, action);
            }
            throw error;
        });
};

export const requestApi = (...requestProps) => request(
    apiUrl,
    true,
    ...requestProps
);
