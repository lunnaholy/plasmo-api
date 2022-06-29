import { PlasmoAPI } from '..';
import { APIResponse } from '../api/globalTypes';
import { CardHolder, CardsAPIResponse, TransactionsAPIResponse } from './typings';

export default class API {
  private parent: PlasmoAPI;

  constructor(parent: PlasmoAPI) {
    this.parent = parent;
  }

  getCards(): Promise<CardsAPIResponse> {
    return new Promise((resolve, reject) => {
      this.parent
        .call('bank/cards', 'GET')
        .then((res: CardsAPIResponse) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  getCardHistory(card: string, to?: number, count?: number): Promise<TransactionsAPIResponse> {
    return new Promise((resolve, reject) => {
      if (isNaN(to)) to = 0;
      if (isNaN(count)) count = 15;
      this.parent
        .call('bank/cards/' + card + '/history', 'GET', { to, count })
        .then((res: TransactionsAPIResponse) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  searchHistory(card: string, value: string, to?: number, count?: number): Promise<TransactionsAPIResponse> {
    if (isNaN(to)) to = 0;
    if (isNaN(count)) count = 15;
    return new Promise((resolve, reject) => {
      this.parent
        .call('bank/cards/' + card + '/history/search', 'GET', { to, count, value })
        .then((res: TransactionsAPIResponse) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  getBills(card: string, to?: number, count?: number): Promise<TransactionsAPIResponse> {
    if (isNaN(to)) to = 0;
    if (isNaN(count)) count = 15;
    return new Promise((resolve, reject) => {
      this.parent
        .call('bank/cards/' + card + '/bills', 'GET', { to, count })
        .then((res: TransactionsAPIResponse) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  getInvoices(card: string, to?: number, count?: number): Promise<TransactionsAPIResponse> {
    if (isNaN(to)) to = 0;
    if (isNaN(count)) count = 15;
    return new Promise((resolve, reject) => {
      this.parent
        .call('bank/cards/' + card + '/invoices', 'GET', { to, count })
        .then((res: TransactionsAPIResponse) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  setActive(card: string): Promise<APIResponse> {
    return new Promise((resolve, reject) => {
      this.parent
        .call('bank/cards/active', 'PATCH', { card })
        .then((res: APIResponse) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  bill(from: string, to: string, amount: number, message?: string): Promise<APIResponse> {
    return new Promise((resolve, reject) => {
      this.parent
        .call('bank/bill', 'POST', { from, to, amount, message })
        .then((res: APIResponse) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  billDecline(card: string, id: number): Promise<APIResponse> {
    return new Promise((resolve, reject) => {
      this.parent
        .call(`bank/cards/${card}/bill/${id}/decline`, 'POST')
        .then((res: APIResponse) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  billPay(card: string, id: number): Promise<APIResponse> {
    return new Promise((resolve, reject) => {
      this.parent
        .call(`bank/cards/${card}/bill/${id}/pay`, 'POST')
        .then((res: APIResponse) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  billCancel(card: string, id: number): Promise<APIResponse> {
    return new Promise((resolve, reject) => {
      this.parent
        .call(`bank/cards/${card}/bill/${id}/cancel`, 'POST')
        .then((res: APIResponse) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  transfer(from: string, to: string, amount: number, message?: string): Promise<APIResponse> {
    return new Promise((resolve, reject) => {
      this.parent
        .call(`bank/transfer`, 'POST', { from, to, amount, message })
        .then((res: APIResponse) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  updateHolder(card: string, holderId: number, permissions: number): Promise<APIResponse> {
    return new Promise((resolve, reject) => {
      this.parent
        .call(`bank/cards/${card}/holder`, 'PATCH', { holder_id: holderId, permissions })
        .then((res: APIResponse) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  updateOwner(card: string, holderId: number, holderType: CardHolder): Promise<APIResponse> {
    return new Promise((resolve, reject) => {
      this.parent
        .call(`bank/cards/${card}/owner`, 'PATCH', { holder_id: holderId, holder_type: holderType })
        .then((res: APIResponse) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  getHolders(card: string): Promise<APIResponse> {
    return new Promise((resolve, reject) => {
      this.parent
        .call(`bank/cards/${card}/holders`, 'GET')
        .then((res: APIResponse) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  delete(card: string): Promise<APIResponse> {
    return new Promise((resolve, reject) => {
      this.parent
        .call(`bank/cards/${card}`, 'DELETE')
        .then((res: APIResponse) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  edit(
    card: string,
    payload: Partial<{
      name: string;
      design: number;
      valueHidden: boolean;
      commissionCard: string;
    }>,
  ): Promise<APIResponse> {
    return new Promise((resolve, reject) => {
      this.parent
        .call(`bank/cards/${card}`, 'PATCH', {
          name: payload.name,
          design: payload.design,
          value_hidden: payload.valueHidden,
          comission_card: payload.commissionCard,
        })
        .then((res: APIResponse) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  getById(ids: string[]): Promise<CardsAPIResponse> {
    return new Promise((resolve, reject) => {
      this.parent
        .call(`bank/cards`, 'GET', {
          ids: ids.join(','),
        })
        .then((res: CardsAPIResponse) => resolve(res))
        .catch((err) => reject(err));
    });
  }
}
