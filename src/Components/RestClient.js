import axios from 'axios';
import {LoginMapper} from "./LoginMapper";

const md5 = require('md5');

const COOKIE_LOGIN_NAME = 'scrapper';
const clientPublicAuthId = '2a9ac062-e94e-4e2d-a514-f2620f94009e';
const loginBorrowerUser = 'superadmin@auditor-framework.com';
const loginBorrowerPass = '123456';
const md5BorrowerUser = md5(loginBorrowerUser);
const clientPublicAuth = btoa(`${clientPublicAuthId}:${md5BorrowerUser}`);
const apiUrl = "http://localhost/";
const apiBase = 'api';
const apiTokenUrl = apiUrl + 'token';

const getAuthorizationConfig = () => {
    const apiToken = localStorage.getItem(COOKIE_LOGIN_NAME);
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
    let apiToken = localStorage.getItem(window.COOKIE_LOGIN_NAME);
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
            localStorage.removeItem(COOKIE_LOGIN_NAME);
            localStorage.setItem(COOKIE_LOGIN_NAME, JSON.stringify(token));
            const req = requestApi(service);
            dispatch(action(req));
        })
        .catch((error) => {
            if (error.response.status === 401) {
                localStorage.removeItem(COOKIE_LOGIN_NAME);
                window.location = 'application/unauthorized';
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

export const debugValues = {
    XDEBUG: false,
    XDEBUG_SESSION_START: 'XDEBUG_SESSION_START=phpstorm',
};

const deb = debugValues.XDEBUG ? debugValues.XDEBUG_SESSION_START : '';

export const actions = {
    GET_JOIN_PAGE: 'GET_JOIN_PAGE'
};

export const getJoinPage = data => ({
    type: actions.GET_JOIN_PAGE,
    payload: data
});

export const joinPageRequest = {
    postCreateBorrower: 'loanApplication:postCreateBorrower'
};

export const services = {
    getJoinPage: () => ({
        name: joinPageRequest.getJoinPage,
        route: `cam_landing_creator/join_page/${deb && ('?' + deb)}`,
        method: 'get'
    })
};
