import { PlasmoAPI } from '..';
import CardsAPI from './cardsApi';
import SearchAPI from './searchApi';

export default class API {
  private parent: PlasmoAPI;
  cards: CardsAPI;
  search: SearchAPI;

  constructor(parent: PlasmoAPI) {
    this.parent = parent;
    this.cards = new CardsAPI(this.parent);
    this.search = new SearchAPI(this.parent);
  }
}
