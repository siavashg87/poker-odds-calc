import Player from "./Player";
import Board from "./Board";
import {toPercent} from "./Utils";
import {name as HanvValueName} from "./HandValue/index";

interface iPlayerResult {
  player: Player,
  wins: number,
  ties: number,
  ranks: { [key: string]: number },
}

class ResultPlayer {
  constructor(private readonly data: iPlayerResult, private table: Result) {
  }

  isWinner() {
    return this.data.player.getSeat() === this.table.getWinner().player.getSeat() && this.getWinsPercentage() > 50
  }

  getWins() {
    return this.data.wins;
  }

  getWinsPercentage(): number {
    return this.getWins() === 0 ? 0 : toPercent(this.getWins() / this.table.getIterations());
  }

  getWinsPercentageString(): string {
    return `${this.table.isApproximate() ? "~" : ""}${this.getWinsPercentage().toFixed(2)}%`;
  }

  getTies() {
    return this.data.ties;
  }

  getTiesPercentage(): number {
    return this.getTies() === 0 ? 0 : toPercent(this.getTies() / this.table.getIterations());
  }

  getTiesPercentageString(): string {
    return `${this.table.isApproximate() ? "~" : ""}${this.getTiesPercentage().toFixed(2)}%`;
  }

  getPlayer() {
    return this.data.player;
  }

  getRanks() {
    let ranks: {[key: string]: ResultRank} = {};
    for (let rank in this.data.ranks) {
      ranks[rank] = new ResultRank(rank, this);
    }
    return ranks;
  }

  getTable() {
    return this.table;
  }

  getRawRanks() {
    return this.data.ranks;
  }

  getName() {
    return `Player #${this.data.player.getSeat()}`;
  }

  getHand() {
    return this.getPlayer().getHand();
  }
}

class ResultRank {
  constructor(private readonly rank: string, private player: ResultPlayer) {
  }

  getCount() {
    return this.player.getRawRanks()[this.rank];
  }

  getPercentage(as_string: boolean = false, _default: string = "0.00%"): number | string {
    const perc = this.getCount() === 0 ? _default : toPercent(this.getCount() / this.player.getTable().getIterations());
    if (as_string)
      return perc === _default ? perc : `${perc}%`;
    return perc;
  }

  getName(): string {
    return HanvValueName[this.rank];
  }
}

export default class Result {
  constructor(private readonly result: {
    players: Array<iPlayerResult>,
    board: Board,
    iterations: number,
    approximate: boolean,
    time: number
  }) {
  }

  getPlayers() {
    return this.result.players.map(data => new ResultPlayer(data, this))
  }

  isApproximate() {
    return this.result.approximate;
  }

  getIterations() {
    return this.result.iterations;
  }

  getTime() {
    return this.result.time;
  }

  getWinner() {
    return this.result.players.slice(0).sort((a, b) => b.wins - a.wins)[0]
  }

  getBoard() {
    return this.result.board.getCards().map(card => card.toString()).join("")
  }

  getDeadCards() {
    return this.result.board.getDeadCards().map(card => card.toString()).join("")
  }

  toJson() {
    return this.result;
  }

}
