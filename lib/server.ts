/*
 * Created on Fri Oct 21 2022
 *
 * Copyright © 2022 Ewsgit
 */

export function getServer(path: string): Promise<Response> {
  console.log('[Server Request]: GET ' + path);
  console.trace();
  let defaultHeaders = {
    userToken: localStorage.getItem('token') as string,
    userName: localStorage.getItem('userName') as string,
  };
  let url = localStorage.getItem('currentServer');
  return new Promise((resolve, reject) => {
    fetch(`${url}/api${path}`, {
      headers: { ...defaultHeaders },
      method: 'GET',
    })
      .then((res) => resolve(res))
      .catch((err) => {
        reject(err);
      });
  });
}
export function postServer(path: string): Promise<Response> {
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
}
export function deleteServer(path: string): Promise<Response> {
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
}
