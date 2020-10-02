import Card from "./Card";
import Game from "./Game";
import {ISuit} from "./Interfaces";

export default class Deck {

  private cards: Array<Card> = [];

  constructor(private game: Game) {
    (["c", "d", "s", "h"] as Array<ISuit>).forEach((suit: ISuit) => {
      let numbers = [6, 7, 8, 9, "T", "J", "Q", "K", "A"] as Array<any>;
      if (!game.isSixPlusTexasHoldem())
        numbers = [2, 3, 4, 5].concat(numbers);
      numbers.forEach(num => {
        this.cards.push(new Card(suit, num, this.game));
      })
    })
  }

  getCards(): Array<Card> {
    return this.cards;
  }

  getAvailableCards() {
    return this.cards.filter(card => !card.inPlay())
  }

}