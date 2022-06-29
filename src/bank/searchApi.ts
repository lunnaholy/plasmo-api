import { PlasmoAPI } from '..';
import { CardHoldersAPIResponse, CardsSearchAPIResponse } from './typings';

export default class API {
  private parent: PlasmoAPI;

  constructor(parent: PlasmoAPI) {
    this.parent = parent;
  }

  searchPlayers(value: string, teams: boolean): Promise<CardHoldersAPIResponse> {
    return new Promise((resolve, reject) => {
      this.parent
        .call('bank/search/players', 'POST', { value, teams })
        .then((res: CardHoldersAPIResponse) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  searchCards(value: string): Promise<CardsSearchAPIResponse> {
    return new Promise((resolve, reject) => {
      this.parent
        .call('bank/search/cards', 'POST', { value })
        .then((res: CardsSearchAPIResponse) => resolve(res))
        .catch((err) => reject(err));
    });
  }
}
