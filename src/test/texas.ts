import {TexasHoldem as Table} from "../index";
import Board from "../lib/Board";
import * as assert from "assert";

describe("Texas Hold'em", function () {
  it('STRAIGHT FLUSH', (done) => {
    const result = new Table()
      .addPlayer(["Qs", "Ks"])
      .addPlayer(["Qd", "Kd"])
      .boardAction((board: Board) => {
        board
          .setFlop(["Js", "Ts", "5h"])
          .setTurn("Td")
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWins(), 9);
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 20.45);
    assert.equal(result.getPlayers()[1].getWins(), 0);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 0);
    assert.equal(result.getPlayers()[0].getTies(), 35);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 79.55);
    assert.equal(result.getPlayers()[1].getTies(), 35);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 79.55);

    done();

  });

  it('QUADS', (done) => {
    const result = new Table()
      .addPlayer(["As", "Ad"])
      .addPlayer(["Ks", "Kd"])
      .boardAction((board: Board) => {
        board
          .setFlop(["Ah", "Kh", "5h"])
          .setTurn("Td")
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWins(), 43);
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 97.73);
    assert.equal(result.getPlayers()[1].getWins(), 1);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 2.27);
    assert.equal(result.getPlayers()[0].getTies(), 0);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 0);
    assert.equal(result.getPlayers()[1].getTies(), 0);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 0);

    done();

  });

  it('QUADS - HIGH CARD', (done) => {
    const result = new Table()
      .addPlayer(["As", "Ad"])
      .addPlayer(["Ks", "Kd"])
      .boardAction((board: Board) => {
        board
          .setFlop(["2d", "2h", "2c"])
          .setTurn("2s")
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWins(), 42);
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 95.45);
    assert.equal(result.getPlayers()[1].getWins(), 0);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 0);
    assert.equal(result.getPlayers()[0].getTies(), 2);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 4.55);
    assert.equal(result.getPlayers()[1].getTies(), 2);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 4.55);

    done();

  });

  it('FULL HOUSE', (done) => {
    const result = new Table()
      .addPlayer(["8d", "8c"])
      .addPlayer(["2d", "2c"])
      .boardAction((board: Board) => {
        board
          .setFlop(["8h", "Ks", "Ad"])
        //.setTurn("2h")
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWins(), 989);
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 99.9);
    assert.equal(result.getPlayers()[1].getWins(), 1);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 0.10);
    assert.equal(result.getPlayers()[0].getTies(), 0);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 0);
    assert.equal(result.getPlayers()[1].getTies(), 0);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 0);

    done();

  });

  it('FLUSH', (done) => {
    const result = new Table()
      .addPlayer(["9d", "Td"])
      .addPlayer(["2c", "3c"])
      .boardAction((board: Board) => {
        board
          .setFlop(["8d", "2d", "Kd"])
        //.setTurn("8d")
        //.setRiver("Jh")
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWins(), 962);
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 97.17);
    assert.equal(result.getPlayers()[1].getWins(), 28);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 2.83);
    assert.equal(result.getPlayers()[0].getTies(), 0);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 0);
    assert.equal(result.getPlayers()[1].getTies(), 0);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 0);

    done();

  });

  it('FLUSH - DOUBLE', (done) => {
    const result = new Table()
      .addPlayer(["9d", "Td"])
      .addPlayer(["7d", "8d"])
      .boardAction((board: Board) => {
        board
          .setFlop(["5d", "2d", "Ad"])
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWins(), 988);
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 99.80);
    assert.equal(result.getPlayers()[1].getWins(), 1);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 0.10);
    assert.equal(result.getPlayers()[0].getTies(), 1);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 0.10);
    assert.equal(result.getPlayers()[1].getTies(), 1);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 0.10);

    done();

  });

  it('STRAIGHT', (done) => {
    const result = new Table()
      .addPlayer(["9d", "Tc"])
      .addPlayer(["2d", "2c"])
      .boardAction((board: Board) => {
        board
          .setFlop(["8h", "Js", "Ad"])
        //.setTurn("8d")
        //.setRiver("Jh")
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWins(), 522);
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 52.73);
    assert.equal(result.getPlayers()[1].getWins(), 450);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 45.45);
    assert.equal(result.getPlayers()[0].getTies(), 18);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 1.82);
    assert.equal(result.getPlayers()[1].getTies(), 18);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 1.82);

    done();

  });

  it('TRIPS', (done) => {
    const result = new Table()
      .addPlayer(["Kd", "Kc"])
      .addPlayer(["2d", "2c"])
      .boardAction((board: Board) => {
        board
          .setFlop(["2h", "Ks", "Ad"])
        //.setTurn("8d")
        //.setRiver("Jh")
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWins(), 947);
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 95.66);
    assert.equal(result.getPlayers()[1].getWins(), 43);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 4.34);
    assert.equal(result.getPlayers()[0].getTies(), 0);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 0);
    assert.equal(result.getPlayers()[1].getTies(), 0);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 0);

    done();

  });

  it('TWO PAIRS', (done) => {
    const result = new Table()
      .addPlayer(["Ad", "2c"])
      .addPlayer(["Kd", "Qc"])
      .boardAction((board: Board) => {
        board
          .setFlop(["Ah", "2s", "Ks"])
          .setTurn("Qh")
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWins(), 40);
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 90.91);
    assert.equal(result.getPlayers()[1].getWins(), 4);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 9.09);
    assert.equal(result.getPlayers()[0].getTies(), 0);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 0);
    assert.equal(result.getPlayers()[1].getTies(), 0);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 0);

    done();

  });

  it('ONE PAIR', (done) => {
    const result = new Table()
      .addPlayer(["Ad", "2c"])
      .addPlayer(["Qd", "Kc"])
      .boardAction((board: Board) => {
        board
          .setFlop(["2h", "Ks", "8d"])
        //.setTurn("2h")
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWins(), 200);
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 20.20);
    assert.equal(result.getPlayers()[1].getWins(), 790);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 79.80);
    assert.equal(result.getPlayers()[0].getTies(), 0);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 0);
    assert.equal(result.getPlayers()[1].getTies(), 0);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 0);

    done();

  });

  it('STRAIGHT', (done) => {
    const result = new Table()
      .addPlayer(["Ad", "Tc"])
      .addPlayer(["5d", "Kc"])
      .boardAction((board: Board) => {
        board
          .setFlop(["6h", "7s", "8d"])
          .setTurn("9h")
      })
      .calculate();

    assert.equal(result.getPlayers()[0].getWins(), 41);
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 93.18);
    assert.equal(result.getPlayers()[1].getWins(), 0);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 0);
    assert.equal(result.getPlayers()[0].getTies(), 3);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 6.82);
    assert.equal(result.getPlayers()[1].getTies(), 3);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 6.82);

    done();

  });

  it('TREE WAYS', (done) => {
    const result = new Table()
      .addPlayer(["2s", "2d"])
      .addPlayer(["Ts", "Td"])
      .addPlayer(["Ks", "Kd"])
      .boardAction((board: Board) => {
        board
          .setFlop(["5s", "6s", "Qh"])
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 10.08);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 8.75);
    assert.equal(result.getPlayers()[2].getWinsPercentage(), 81.17);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 0);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 0);
    assert.equal(result.getPlayers()[2].getTiesPercentage(), 0);

    done();

  });

  it('DEAD CARD', (done) => {
    const ts = Date.now();
    const result = new Table()
      .addPlayer(["As", "Ks"])
      .addPlayer(["Ad", "Kd"])
      .boardAction((board: Board) => {
        board
          .setFlop(["Ts", "6h", "5h"])
          .burn(["Js", "Qs"])
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 3.10);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 0);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 96.90);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 96.90);

    done();

  }).timeout(3e3);

  it('50/50', (done) => {
    const result = new Table()
      .addPlayer(["2s", "3s"])
      .addPlayer(["2d", "3d"])
      .calculate();
    assert.equal(Math.round(result.getPlayers()[0].getWinsPercentage()), 7);
    assert.equal(Math.round(result.getPlayers()[1].getWinsPercentage()), 7);
    assert.equal(Math.round(result.getPlayers()[0].getTiesPercentage()), 86);
    assert.equal(Math.round(result.getPlayers()[1].getTiesPercentage()), 86);

    done();

  }).timeout(3e3);

  it('EXHAUSTIVE', (done) => {
    const result = new Table()
      .addPlayer(["6s", "7s"])
      .addPlayer(["6d", "7d"])
      .exhaustive()
      .calculate();
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 7.16);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 7.16);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 85.69);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 85.69);

    done();

  }).timeout(2e4);

});