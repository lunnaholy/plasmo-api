import { PlasmoAPI } from '..';
import { APIResponse } from '../api/globalTypes';
import { Field, ProfileAPIResponse } from './typings';
import { NotificationsAPIResponse } from '../notifications/typings';

export default class API {
  private parent: PlasmoAPI;

  constructor(parent: PlasmoAPI) {
    this.parent = parent;
  }

  /**
   * Ищет пользователя по одному из аргументов
   * @param nickname Никнейм игрока
   * @param discord_id Discord id игрока
   * @param id Id игрока
   * @param fields Возвращаемые поля
   * @returns Ошибку если пользователь не найден, объект ProfileAPIResponse если найден
   */
  getProfile(nickname?: string, discordId?: bigint, id?: number, fields?: Field[]): Promise<ProfileAPIResponse> {
    return new Promise((resolve, reject) => {
      this.parent
        .call('user/profile', 'GET', { nick: nickname, discord_id: discordId, id, fields })
        .then((res: ProfileAPIResponse) => resolve(res))
        .catch(reject);
    });
  }

  /**
   * Запрашивает текущий аккаунт пользователя
   * @returns Текущий аккаунт пользователя
   */
  getAccount(): Promise<ProfileAPIResponse> {
    return new Promise((resolve, reject) => {
      this.parent
        .call('user', 'GET')
        .then((res: ProfileAPIResponse) => resolve(res))
        .catch(reject);
    });
  }

  /**
   * Помечает все уведомления прочитанными
   * @returns
   */
  readNotifications(): Promise<APIResponse> {
    return new Promise((resolve, reject) => {
      this.parent
        .call('user/notifications', 'PATCH')
        .then((res: APIResponse) => resolve(res))
        .catch(reject);
    });
  }

  /**
   * Получает все уведомления
   * @returns Уведомления
   */
  getNotifications(from?: number): Promise<NotificationsAPIResponse> {
    return new Promise((resolve, reject) => {
      this.parent
        .call('user/notifications', 'GET', { from })
        .then((res: NotificationsAPIResponse) => resolve(res))
        .catch(reject);
    });
  }

  /**
   * Авторизация на сервере
   * @param token Токен, полученный в чат-месседже
   * @returns
   */

  auth(token: string): Promise<APIResponse> {
    return new Promise((resolve, reject) => {
      this.parent
        .call('user/mc_auth', 'GET', { token })
        .then((res: APIResponse) => resolve(res))
        .catch(reject);
    });
  }
}
