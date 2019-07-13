# Poker Odds Calc

[![Build Status](https://travis-ci.org/rundef/node-poker-odds-calculator.svg?branch=master)](https://travis-ci.org/rundef/node-poker-odds-calculator)
[![Node version required](https://img.shields.io/node/v/poker-odds.svg)](https://www.npmjs.com/package/poker-odds-calc)
[![Latest Stable Version](https://img.shields.io/npm/v/poker-odds-calc.svg)](https://www.npmjs.com/package/poker-odds-calc)

Fastest and most accurate node module for calculating odds of poker games Texas Hold'em, Texas Shortdeck/Sixplus and Omaha.

## Installation

```bash
npm install -g poker-odds-calc
```

### Usage

```bash
poker-odds-calc -p AdKh -p AcKh -b 5sTd9c

# options
-g, --game texas_holdem     # Select between texas_holdem, shortdeck_holdem and omaha. Default texas_holdem.
-b, --board 5sTd9cTh        # Define community cards.
-p, --player AcKh           # Define any number of player hand.
-l, --limit 1000            # Limit number of iterations. Default 100,000.
-e, --exhaustive            # Run all possible board combinations, regardless limit option.
-d, --dead 2s2d             # Dead card(s) to exclude from calculation.
--tripsbeatstraight         # Option only available for -g shortdeck_holdem
-h, --help                  # Show help
```

poker-odds-calc -p QsKs -p QdKd -b JsTs5hTd

![--example](https://i.imgur.com/CDxNZcz.png)

## API Usage

Let's take the previous example, but use the API instead:

```js
import {TexasHoldem, SixPlusHoldem, Omaha} from './index';

const Table = new TexasHoldem();
Table
  .addPlayer(["Qs", "Ks"])
  .addPlayer(["Qd", "Kd"])

  .setBoard(["Js","Ts","5h","Td"])
  // or
  .boardAction(board => {
    board
      .setFlop(["Js", "Ts", "5h"])
      .setTurn("Td")
  })
  ;

const Result = Table.calculate();

Result.getPlayers().forEach(player => {
  console.log(`${player.getName()} - ${player.getHand()} - Wins: ${player.getWinsPercentageString()} - Ties: ${player.getTiesPercentageString()}`);
});

console.log(`Board: ${Result.getBoard()}`);
console.log(`Iterations: ${Result.getIterations()}`);
console.log(`Time takes: ${Result.getTime()}ms`);

// Outputs:
// Player #1 - QsKs - Wins: 20.45% - Ties: 79.55%
// Player #2 - QdKd - Wins: 0.00% - Ties: 79.55%
// Board: JsTs5hTd
// Iterations: 44
// Time takes: 8ms

```


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.