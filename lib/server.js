"use strict";
/*
 * Created on Fri Oct 21 2022
 *
 * Copyright © 2022 Ewsgit
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Server = {
    get: (path) => {
        let defaultHeaders = {
            userToken: localStorage.getItem('token'),
            userName: localStorage.getItem('userName'),
        };
        let url = localStorage.getItem('currentServer');
        console.log('[Server Request]: GET ' + path);
        return fetch(`${url}/api${path}`, {
            headers: { ...defaultHeaders },
            method: 'GET',
        });
    },
    post: (path) => {
        let defaultHeaders = {
            userToken: localStorage.getItem('token'),
            userName: localStorage.getItem('userName'),
        };
        let url = localStorage.getItem('currentServer');
        console.log('[Server Request]: POST ' + path);
        return fetch(`${url}/api${path}`, {
            headers: { ...defaultHeaders },
            method: 'POST',
        });
    },
    delete: (path) => {
        let defaultHeaders = {
            userToken: localStorage.getItem('token'),
            userName: localStorage.getItem('userName'),
        };
        let url = localStorage.getItem('currentServer');
        console.log('[Server Request]: DELETE ' + path);
        return fetch(`${url}/api${path}`, {
            headers: { ...defaultHeaders },
            method: 'DELETE',
        });
    },
};
exports.default = Server;
