import Client from './client';
import { OAuthGrantType, OAuthTokenResponse } from './typings';

export default class Token {
  private parent: Client;

  constructor(parent: Client) {
    this.parent = parent;
  }

  refreshToken(refreshToken: string): Promise<OAuthTokenResponse> {
    return new Promise((resolve, reject) => {
      this.parent
        .call('oauth2/token', 'POST', {
          client_id: this.parent.clientId,
          client_secret: this.parent.clientSecret,
          grant_type: OAuthGrantType.REFRESH,
          refresh_token: refreshToken
        })
        .then((res: OAuthTokenResponse) => resolve(res))
        .catch((err) => reject(err));
    });
  }
}
