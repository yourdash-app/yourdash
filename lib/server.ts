/*
 * Created on Fri Oct 21 2022
 *
 * Copyright © 2022 Ewsgit
 */

interface extraHeaders {
  [string: string]: any;
}

const SERVER = {
  get(path: string, headers?: extraHeaders): Promise<Response> {
    console.log('[Server Request]: GET ' + path);
    console.trace()
    let defaultHeaders = {
      sessiontoken: localStorage.getItem('sessiontoken') as string,
      username: localStorage.getItem('username') as string,
    };
    let url = localStorage.getItem('currentServer');
    return new Promise((resolve, reject) => {
      fetch(`${url}/api${path}`, {
        headers: { ...defaultHeaders, ...headers },
        method: 'GET',
      })
        .then((res) => resolve(res))
        .catch((err) => {
          reject(err);
        });
    });
  },
  post(path: string, headers?: extraHeaders): Promise<Response> {
    console.log('[Server Request]: POST ' + path);
    console.trace();
    let defaultHeaders = {
      sessiontoken: localStorage.getItem('sessiontoken') as string,
      username: localStorage.getItem('username') as string,
    };
    let url = localStorage.getItem('currentServer');
    console.log('[Server Request]: POST ' + path);
    return fetch(`${url}/api${path}`, {
      headers: { ...defaultHeaders, ...headers },
      method: 'POST',
    });
  },
  delete(path: string, headers?: extraHeaders): Promise<Response> {
    console.log('[Server Request]: DELETE ' + path);
    let defaultHeaders = {
      sessiontoken: localStorage.getItem('sessiontoken') as string,
      username: localStorage.getItem('username') as string,
    };
    let url = localStorage.getItem('currentServer');
    console.log('[Server Request]: DELETE ' + path);
    console.trace();
    return fetch(`${url}/api${path}`, {
      headers: { ...defaultHeaders, ...headers },
      method: 'DELETE',
    });
  },
};

export default SERVER;
