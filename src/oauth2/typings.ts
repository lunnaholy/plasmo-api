import { APIResponse } from '../api/globalTypes';
import { Scope } from './scopes/typings';

export interface OAuthParams {
  client_id: string;
  client_secret: string;
  redirect_uri: string;
  scopes: Scope[];
}

export interface OAuthTokenResponse extends APIResponse {
  data?: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    scope: Scope[];
    token_type: string;
  };
}

export enum OAuthReponseType {
  CODE = 'code',
  TOKEN = 'token',
}

export enum OAuthGrantType {
  AUTH_CODE = 'authorization_code',
  REFRESH = 'refresh_token',
}
