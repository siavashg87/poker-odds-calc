#!/usr/bin/env node

import * as argv from "argv";
import Table from "../Table";
import Result from "../Result";
import {CardsFromString, Log} from "../Utils";

argv.option([
  {
    name: "game",
    short: "g",
    type: "string",
    description: "Select between texas_holdem, shortdeck_holdem and omaha. Default texas_holdem."
  },
  {
    name: "board",
    short: "b",
    type: "string",
    description: "Define community cards. Example -b 5sTd9cTh."
  },
  {
    name: "player",
    short: "p",
    type: "list,string",
    description: "Define any number of player hand. Example -p AcKh."
  },
  {
    name: "exhaustive",
    short: "e",
    type: "boolean",
    description: "Run all possible board combinations, regardless limit option."
  },
  {
    name: "limit",
    short: "l",
    type: "int",
    description: "Limit number of iterations. Default 100,000."
  },
  {
    name: "dead",
    short: "d",
    type: "string",
    description: "Dead card(s) to exclude from calculation. Example 2s2d"
  },
  {
    name: "tripsbeatstraight",
    type: "boolean",
    description: "Option only available for -g shortdeck_holdem"
  }
]);

const {options} = argv.run();
const log = Log.PrintLn;

let PrintResult = (result: Result) => {
  log();
  log(Log.color(`Board`, 'grey') + "   " + table.getBoard().getCards().map(c => Log.color(c.toString(), c.color())).join(" "));
  log();
  log(`Player        Hand         Wins      Ties`, 'grey');
  result.getPlayers().forEach(player => {
    log(`${Log.color(player.getName(), 'cyan')}     ${player.getPlayer().getCards().map(c => Log.color(c.toString(), c.color())).join(" ")}     ${Log.color(player.getWinsPercentageString().padStart(7, " "), player.isWinner() ? "green" : "white")}    ${Log.color(player.getTiesPercentageString().padStart(6, " "), "white")}`);
  });

  if (!result.isApproximate()) {
    const COL_WIDTH = 17;
    log();
    let players = result.getPlayers();
    let ranks = Object.keys(players[0].getRanks());
    log('                 ' + players.map((player, i) => {
      return `${player.getName()}`.padStart(COL_WIDTH, " ")
    }).join(""), 'cyan');
    ranks.forEach(rank => {
      let str = Log.color(players[0].getRanks()[rank].getName().padEnd(COL_WIDTH, " "), 'grey');
      players.forEach((player, i) => {
        if (player.getRanks()[rank].getCount() > 0)
          str += Log.color((player.getRanks()[rank].getCount() + " (" + player.getRanks()[rank].getPercentage(true) + ")").padStart(COL_WIDTH, " "), player.getRanks()[rank].getCount() > 0 ? 'white' : 'grey');
        else
          str += Log.color("_".padStart(COL_WIDTH, " "), 'grey');
      });
      log(str);
    });
  }


  log();
  log(`${result.getIterations()} iterations in ${result.getTime()}ms`, 'grey');
};

let table: Table;

try {
  table = new Table(options.game);

  if (!Array.isArray(options.player))
    throw new Error("No players found! Use -p or --player. Example -p AcKh.");

  options.player.forEach((p: string) => {
    table.addPlayer(CardsFromString(p));
  });

  if (options.hasOwnProperty("board"))
    table.setBoard(CardsFromString(options.board));

  if (options.tripsbeatstraight)
    table.tripsBeatsStraight();

  if (options.hasOwnProperty("limit"))
    table.limit(options.limit);

  if (options.exhaustive === true)
    table.exhaustive();

  if (options.hasOwnProperty("dead"))
    table.setDeadCards(CardsFromString(options.dead));

  PrintResult(table.calculate());

} catch (e) {
  log(e.toString(), 'red')
}


