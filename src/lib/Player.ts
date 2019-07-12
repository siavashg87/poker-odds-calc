import Card from "./Card";
import Table from "./Table";

export default class Player {

  private hand: Array<Card> = null;

  constructor(private seat: number, private Table: Table, hand: Array<string> = null) {
    if (Array.isArray(hand))
      this.setHand(hand);
  }

  setHand(hand: Array<string>) {
    const game = this.Table.getGame();
    if ((game.isTexasHoldem() || game.isSixPlusTexasHoldem()) && hand.length !== 2)
      throw new Error("A Texas hold'em hand must contain exactly 2 cards!");
    if (game.isOmaha() && hand.length !== 4)
      throw new Error("An Omaha hand must contain exactly 4 cards!");
    this.hand = hand.map(c => {
      return this.Table.getDeck().getCards().find(card => card.toString() === c).setOwner(this);
    });
    return this;
  }

  getHand() {
    if (this.hand === null)
      return null;
    return this.hand.map(card => card.toString()).join("");
  }

  inHand() {
    return this.hand !== null;
  }

  getCards() {
    return this.hand;
  }

  isEmpty() {
    return !this.inHand()
  }

  getSeat() {
    return this.seat;
  }

}
