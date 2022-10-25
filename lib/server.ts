/*
 * Created on Fri Oct 21 2022
 *
 * Copyright © 2022 Ewsgit
 */

const Server = {
  get: (path: string) => {
    let defaultHeaders = {
      userToken: localStorage.getItem('token') as string,
      userName: localStorage.getItem('userName') as string,
    };
    let url = localStorage.getItem('currentServer');
    console.log("[Server Request]: GET " + path)
    return fetch(`${url}/api${path}`, {
      headers: { ...defaultHeaders },
      method: 'GET',
    });
  },
  post: (path: string) => {
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
  delete: (path: string) => {
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

export default Server;
