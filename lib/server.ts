/*
 * Created on Fri Oct 21 2022
 *
 * Copyright © 2022 Ewsgit
 */

const Server = {
  get: (path: string) => {
    let defaultHeaders = {
      userToken: localStorage.getItem('githubToken') as string,
      userName: localStorage.getItem('githubUsername') as string,
    };
    return fetch(`${localStorage.getItem('currentServer')}/api${path}`, {
      headers: { ...defaultHeaders },
      method: 'GET',
    });
  },
  post: (path: string) => {
    let defaultHeaders = {
      userToken: localStorage.getItem('githubToken') as string,
      userName: localStorage.getItem('githubUsername') as string,
    };
    return fetch(`${localStorage.getItem('currentServer')}/api${path}`, {
      headers: { ...defaultHeaders },
      method: 'POST',
    });
  },
  delete: (path: string) => {
    let defaultHeaders = {
      userToken: localStorage.getItem('githubToken') as string,
      userName: localStorage.getItem('githubUsername') as string,
    };
    return fetch(`${localStorage.getItem('currentServer')}/api${path}`, {
      headers: { ...defaultHeaders },
      method: 'DELETE',
    });
  },
};

export default Server;
