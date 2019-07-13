import Table from "./Table";
import Card from "./Card";
import Player from "./Player";
import Result from "./Result";
import {clone, sampleSize} from "lodash";
import {type as HandValueTypes} from "./HandValue/index";

export default class Board {

  private cards: Array<Card> = [];
  private dead_cards: Array<Card> = [];

  constructor(private table: Table) {
  }

  private checkGameRules(action: string) {
    if (this.getGame().isTexasHoldem() || this.getGame().isSixPlusTexasHoldem() || this.getGame().isOmaha()) {
      if (
        (action === "flop" && this.cards.length !== 0)
        || (action === "turn" && this.cards.length !== 3)
        || (action === "river" && this.cards.length !== 4)
      )
        throw new Error(`Cannot set ${action}`);
    }
    else if (~["flop", "turn", "river"].indexOf(action))
      throw new Error(`Game ${this.getGame().getGame()} cannot have a ${action}!`);
  }

  setFlop(cards: Array<string>) {
    this.checkGameRules("flop");
    if (cards.length !== 3)
      throw new Error(`A flop takes exactly 3 cards, ${cards.length} given!`);
    cards.forEach(card => this.setCard(card));
    return this;
  }

  dead(cards: string | Array<string>) {
    if (!Array.isArray(cards))
      cards = [cards];
    (cards as Array<string>).forEach(card => {
      this.dead_cards.push(this.table.getDeck().getCards().find(c => card === c.toString()).setOwner(this))
    });
    return this;
  }

  getDeadCards() {
    return this.dead_cards;
  }

  setTurn(card: string) {
    this.checkGameRules("turn");
    this.setCard(card);
    return this;
  }

  setRiver(card: string) {
    this.checkGameRules("river");
    this.setCard(card);
    return this;
  }

  private setCard(card: string) {
    const c = this.table.getDeck().getCards().find(c => card === c.toString());
    if (!c)
      throw new Error(`Card ${card} not found!`);
    this.cards.push(c.setOwner(this));
    return this;
  }

  getGame() {
    return this.table.getGame();
  }

  getCards() {
    return this.cards;
  }

  getResult(): Result {

    let ts = Date.now();
    let ranks: { [key: string]: number } = {};
    for (let type in HandValueTypes)
      ranks[type] = 0;

    const players = this.table.getPlayersInHand();
    const _players: Array<any> = players.map((p, i) => {
      return {
        wins: 0,
        ties: 0,
        ranks: clone(ranks),
        player: players[i]
      }
    });
    let iterations = 0;

    const approximate = !this.table.runExhaustive() && this.cards.length <= 2;
    const cards = this.table.getDeck().getAvailableCards();

    let getResult = (players: Array<Player>, board: Array<Card>) => {
      let result = this.table.getGame().getResult(players, board);

      const top_score = result.slice(0).sort((a: any, b: any) => b.points - a.points)[0].points;
      const tie = result.filter((rank: any) => rank.points === top_score).length > 1;

      for (let i = 0, j = _players.length; i < j; i++) {
        _players[i].ranks[result[i].rank.str]++;
        if (result[i].points === top_score) {
          if (tie)
            _players[i].ties++;
          else
            _players[i].wins++;
        }
      }
      iterations++;
    };

    let completeBoard = (board: Array<Card>, pi: number, l: number) => {
      if (approximate) {
        for (let i = 0; i < this.table.getLimit(); i++) {
          getResult(players, sampleSize(cards, 5));
        }
      }
      else {
        if (!l)
          getResult(players, board);
        else {
          cards.forEach((card, i) => {
            if (i < pi)
              return;

            const cardStr = card.toString();
            if (board.find(c => c.toString() === cardStr))
              return;

            completeBoard([...board, card], i, l - 1);
          });
        }
      }
    };

    completeBoard(this.cards, 0, 5 - this.cards.length);

    return new Result({players: _players, iterations, approximate, time: Date.now() - ts, board: this});

  }

}