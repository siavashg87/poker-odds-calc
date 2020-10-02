import Card from "./Card";
import Game from "./Game";
import {FullDeck, ISuit, SixPlusDeck, SuitsList} from "./Interfaces";

export default class Deck {

  private cards: Array<Card> = [];

  constructor(private game: Game) {
    SuitsList.forEach((suit: ISuit) => {
      let numbers = game.isSixPlusTexasHoldem() ? SixPlusDeck : FullDeck;
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