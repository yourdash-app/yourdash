/*
 * Created on Fri Oct 21 2022
 *
 * Copyright © 2022 Ewsgit
 */

interface extraHeaders {
  [ string: string ]: any;
}

const SERVER = {
  get(path: string, headers?: extraHeaders): Promise<Response> {
    console.log('[Server Request]: GET ' + path);
    let defaultHeaders = {
      sessiontoken: localStorage.getItem('sessiontoken') as string,
      username: localStorage.getItem('username') as string,
      'content-type': 'application/json',
    };
    let url = localStorage.getItem('currentServer');
    return new Promise((resolve, reject) => {
      fetch(`${url}/api${path}`, {
        headers: {
          ...defaultHeaders, ...headers
        },
        method: 'GET',
      })
        .then((res) => resolve(res))
        .catch((err) => {
          reject(err);
        });
    });
  },
  post(path: string, extras: { headers?: extraHeaders, body?: string }): Promise<Response> {
    console.log('[Server Request]: POST ' + path);
    let defaultHeaders = {
      sessiontoken: localStorage.getItem('sessiontoken') as string,
      username: localStorage.getItem('username') as string,
      "content-type": "application/json"
    };
    let url = localStorage.getItem('currentServer');
    return new Promise((resolve, reject) => {
      fetch(`${url}/api${path}`, {
        headers: {
          ...defaultHeaders, ...extras?.headers
        },
        body: extras?.body,
        method: 'POST',
      })
        .then((res) => resolve(res))
        .catch((err) => {
          reject(err);
        });
    });
  },
  delete(path: string, headers?: extraHeaders): Promise<Response> {
    console.log('[Server Request]: DELETE ' + path);
    let defaultHeaders = {
      sessiontoken: localStorage.getItem('sessiontoken') as string,
      username: localStorage.getItem('username') as string,
      'content-type': 'application/json',
    };
    let url = localStorage.getItem('currentServer');
    return new Promise((resolve, reject) => {
      fetch(`${url}/api${path}`, {
        headers: {
          ...defaultHeaders, ...headers
        },
        method: 'DELETE',
      })
        .then((res) => resolve(res))
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default SERVER;

export function verifyAndReturnJson(req: Promise<Response>, res: (_res: any) => void, error: () => void) {
  req
    .then((resp) => {
      resp.json()
        .then((json) => {
          if (!json.error)
            return res(json)
          error()
        })
        .catch(() => {
          error()
        })
    })
    .catch((err) => {
      console.error(err)
      error()
    })
}