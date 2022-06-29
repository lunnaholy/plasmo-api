import fetch from 'node-fetch';
import UsersAPI from './users/api';
import BankAPI from './bank/api';
import { APIMethod, APIResponse } from './api/globalTypes';
import oauth2 from './oauth2';

export class PlasmoAPI {
  private accessToken: string;
  private baseUrl: string = 'https://rp.plo.su/api/';

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  call(url: string, method: APIMethod, body?: Record<string, any>): Promise<any> {
    return new Promise<APIResponse>((resolve, reject) => {
      url = this.baseUrl + url;
      if (method === 'GET' && body != null) {
        url = url + '?' + new URLSearchParams(body);
      }
      fetch(url, {
        body: method === 'POST' ? JSON.stringify(body) : null,
        headers: {
          Authorization: 'Bearer ' + this.accessToken,
          'Content-Type': 'application/json',
        },
        method,
      })
        .then((res) => res.json())
        .then((json: APIResponse) => {
          if (json.status === false) {
            reject(`Возникла ошибка во время обращения к API: ${json.error.msg} [${json.error.code}]`);
          } else {
            resolve(json);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  users: UsersAPI = new UsersAPI(this);
  bank: BankAPI = new BankAPI(this);
}

export { oauth2 };
