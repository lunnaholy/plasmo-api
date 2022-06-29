import Client from './client';
import { OAuthGrantType, OAuthReponseType, OAuthTokenResponse } from './typings';

export default class Code {
  private parent: Client;

  constructor(parent: Client) {
    this.parent = parent;
  }

  getUri(): string {
    const params: Record<string, any> = {
      client_id: this.parent.clientId,
      redirect_uri: this.parent.redirectUri,
      response_type: OAuthReponseType.CODE,
      scope: this.parent.scopes.join(" "),
    };
    return `${this.parent.authUrl}?${new URLSearchParams(params)}`;
  }

  getToken(code: string): Promise<OAuthTokenResponse> {
    return new Promise((resolve, reject) => {
      this.parent
        .call('oauth2/token', 'POST', {
          client_id: this.parent.clientId,
          client_secret: this.parent.clientSecret,
          grant_type: OAuthGrantType.AUTH_CODE,
          redirect_uri: this.parent.redirectUri,
          code,
        })
        .then((res: OAuthTokenResponse) => resolve(res))
        .catch((err) => reject(err));
    });
  }
}
