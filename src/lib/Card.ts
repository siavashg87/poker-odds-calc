import Player from "./Player";
import Board from "./Board";
import Game from "./Game";

export default class Card {

  private owner: Player | Board = null;
  private rank: number = null;
  readonly str: string = null;

  constructor(private suit: "c" | "s" | "h" | "d", private num: number | string, private game: Game) {
    this.rank = [2, 3, 4, 5, 6, 7, 8, 9, "T", "J", "Q", "K", "A"].indexOf(this.num) + 2;
    this.str = num + suit;
  }

  toString(): string {
    return this.str;
  }

  color() {
    switch (this.suit) {
      case "c":
      case "s":
        return "white";
      case "d":
      case "h":
        return "red";
    }
  }

  inPlay(): boolean {
    return this.owner !== null;
  }

  setOwner(owner: Player | Board) {
    if (this.inPlay())
      throw new Error(`Card ${this.toString()} already in play!`);
    this.owner = owner;
    return this;
  }

  isAce() {
    return this.num === "A";
  }

  isLowAce() {
    return this.num === "A" && this.rank !== 14;
  }

  setAsLowAce() {
    if (!this.isAce())
      throw new Error("Only Ace can have a rank of 1");
    this.rank = this.game.isSixPlusTexasHoldem() ? 5 : 1;
    return this;
  }

  getRank(leading_zero: boolean = false): any {
    if (leading_zero)
      return `${this.rank < 10 ? "0" : ""}${this.rank}`;
    return this.rank;
  }

  getSuit() {
    return this.suit;
  }

  getNum() {
    return this.num;
  }

}