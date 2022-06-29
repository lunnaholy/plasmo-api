import { APIMethod, APIResponse } from '../api/globalTypes';
import { Scope } from './scopes/typings';
import { OAuthParams, OAuthReponseType, OAuthTokenResponse } from './typings';
import fetch from 'node-fetch';
import Code from './code';
import Token from './token';

export default class Client {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: Scope[];

  baseUrl: string = 'https://rp.plo.su/api/';
  authUrl: string = 'https://rp.plo.su/oauth2';

  constructor(params: OAuthParams) {
    this.clientId = params.client_id;
    this.clientSecret = params.client_secret;
    this.redirectUri = params.redirect_uri;
    this.scopes = params.scopes;
  }

  call(url: string, method: APIMethod, params?: Record<string, any>): Promise<APIResponse> {
    return new Promise((resolve, reject) => {
      url = this.baseUrl + url;
      if (method === 'GET' && params != null) {
        url = url + '?' + new URLSearchParams(params);
      }
      fetch(url, {
        method,
        body: method === "POST" ? JSON.stringify(params) : null,
        headers: {
          'Content-Type': 'application/json'
        }
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

  code: Code = new Code(this);
  token: Token = new Token(this);
}
