import { APIResponse } from '../api/globalTypes';

export type Currency = 'DIAMOND';

export interface CardsAPIResponse extends APIResponse {
  data?: {
    cards: Card[];
    active_card: string;
  };
}

export interface TransactionsAPIResponse extends APIResponse {
  data?: {
    total: number;
    list: Transaction[];
  };
}

export interface CardHoldersAPIResponse extends APIResponse {
  data?: CardHolder[];
}

export interface CardsSearchAPIResponse extends APIResponse {
  data?: Card[];
}

export interface Transaction {
  id: number;
  card: Card;
  amount: number;
  message: string;
  date: number;
}

export interface CardHolder {
  id: number;
  type: CardHolderType;
  name: string;
}

export interface Card {
  id: number;
  bank?: string;
  bank_code: string;
  holder?: string;
  holder_id: number;
  holder_type: CardHolderType;
  name: string;
  design?: number;
  text_inverted?: boolean;
  currency?: Currency;
  value?: number;
  value_hidden?: boolean;
  permisions?: number;
}

export enum CardHolderType {
  USER = 0,
  TEAM = 1,
  BANKER = 3,
}
