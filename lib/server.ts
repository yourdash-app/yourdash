/*
 * Created on Fri Oct 21 2022
 *
 * Copyright © 2022 Ewsgit
 */

interface extraHeaders {
  [string: string]: any
}

const SERVER = {
  get(path: string, headers?: extraHeaders): Promise<Response> {
    console.log('[Server Request]: GET ' + path);
    console.trace();
    let defaultHeaders = {
      userToken: localStorage.getItem('token') as string,
      userName: localStorage.getItem('userName') as string,
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
  post(path: string): Promise<Response> {
    let defaultHeaders = {
      userToken: localStorage.getItem('token') as string,
      userName: localStorage.getItem('userName') as string,
    };
    let url = localStorage.getItem('currentServer');
    console.log('[Server Request]: POST ' + path);
    return fetch(`${url}/api${path}`, {
      headers: { ...defaultHeaders },
      method: 'POST',
    });
  },
  delete(path: string): Promise<Response> {
    let defaultHeaders = {
      userToken: localStorage.getItem('token') as string,
      userName: localStorage.getItem('userName') as string,
    };
    let url = localStorage.getItem('currentServer');
    console.log('[Server Request]: DELETE ' + path);
    return fetch(`${url}/api${path}`, {
      headers: { ...defaultHeaders },
      method: 'DELETE',
    });
  },
};

export default SERVER;
