import {Omaha as Table} from "../index";
import Board from "../lib/Board";
import * as assert from "assert";

describe("Texas Omaha", function () {

  it('STRAIGHT FLUSH - invalid', (done) => {
    const result = new Table()
      .addPlayer(["Th", "9h", "Jh", "6s"])
      .addPlayer(["Tc", "9c", "8c", "5c"])
      .boardAction((board: Board) => {
        board
          .setFlop(["Qh", "5d", "8h"])
          .setTurn("3s")
          .setRiver("4s")
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 0);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 100.00);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 0);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 0);

    done();

  });

  it('STRAIGHT FLUSH - valid', (done) => {
    const result = new Table()
      .addPlayer(["Th", "9h", "2s", "7d"])
      .addPlayer(["Tc", "9c", "8c", "7c"])
      .boardAction((board: Board) => {
        board
          .setFlop(["Qh", "Jh", "8h"])
          .setTurn("3s")
          .setRiver("4s")
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 100.00);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 0);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 0);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 0);

    done();

  });


  it('STRAIGHT FLUSH - valid', (done) => {
    const result = new Table()
      .addPlayer(["Th", "9h", "Jh", "6s"])
      .addPlayer(["Tc", "9c", "8c", "5c"])
      .boardAction((board: Board) => {
        board
          .setFlop(["Qh", "5d", "8h"])
          .setTurn("7h")
          .setRiver("6h")
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 100.00);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 0);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 0);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 0);

    done();

  });

  it('QUADS - valid', (done) => {
    const result = new Table()
      .addPlayer(["Th", "Tc", "2h", "2c"])
      .addPlayer(["3c", "4c", "5c", "6c"])
      .boardAction((board: Board) => {
        board
          .setFlop(["Td", "Ts", "8h"])
          .setTurn("3s")
          .setRiver("3d")
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 100.00);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 0);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 0);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 0);

    done();

  });

  it('QUADS - invalid', (done) => {
    const result = new Table()
      .addPlayer(["Th", "Tc", "Ts", "4d"])
      .addPlayer(["3c", "4c", "5c", "6c"])
      .boardAction((board: Board) => {
        board
          .setFlop(["Td", "2s", "4h"])
          .setTurn("3s")
          .setRiver("9d")
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 0);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 100.00);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 0);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 0);

    done();

  });

  it('QUADS - valid', (done) => {
    const result = new Table()
      .addPlayer(["Kh", "4d", "2s", "2c"])
      .addPlayer(["Ac", "Ad", "5c", "6c"])
      .boardAction((board: Board) => {
        board
          .setFlop(["Td", "2d", "2h"])
          .setTurn("Ts")
          .setRiver("Tc")
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 100.00);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 0);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 0);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 0);

    done();

  });

  it('FULL HOUSE - invalid', (done) => {
    const result = new Table()
      .addPlayer(["As", "Jh", "Jd", "Jc"])
      .addPlayer(["7c", "9d", "Qc", "Qs"])
      .boardAction((board: Board) => {
        board
          .setFlop(["Td", "Ad", "Ac"])
          .setTurn("Ts")
          .setRiver("Tc")
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 0);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 100.00);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 0);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 0);

    done();

  });

  it('THREE OF A KIND - valid', (done) => {
    const result = new Table()
      .addPlayer(["As", "9s", "2d", "3c"])
      .addPlayer(["7c", "9d", "Qd", "Qs"])
      .boardAction((board: Board) => {
        board
          .setFlop(["Ad", "5c", "5d"])
          .setTurn("Ac")
          .setRiver("Jc")
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 100.00);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 0);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 0);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 0);

    done();

  });

  it('THREE OF A KIND - invalid', (done) => {
    const result = new Table()
      .addPlayer(["3c", "As", "Ad", "Ac"])
      .addPlayer(["7c", "9d", "Qd", "Qs"])
      .boardAction((board: Board) => {
        board
          .setFlop(["9s", "5c", "5d"])
          .setTurn("2d")
          .setRiver("Qc")
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 0);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 100.00);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 0);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 0);

    done();

  });

  it('TWO PAIRS', (done) => {
    const result = new Table()
      .addPlayer(["3c", "5s", "Ad", "Ac"])
      .addPlayer(["7c", "9d", "Kd", "Js"])
      .boardAction((board: Board) => {
        board
          .setFlop(["3s", "5c", "6d"])
          .setTurn("Ks")
          .setRiver("Qc")
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 100.00);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 0);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 0);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 0);

    done();

  });

  it('ONE PAIR', (done) => {
    const result = new Table()
      .addPlayer(["3c", "5s", "Ad", "Ac"])
      .addPlayer(["7c", "9d", "Kd", "Js"])
      .boardAction((board: Board) => {
        board
          .setFlop(["3s", "4c", "6d"])
          .setTurn("Ks")
          .setRiver("Qc")
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 100.00);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 0);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 0);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 0);

    done();

  });

  it('STRAIGHT - valid', (done) => {
    const result = new Table()
      .addPlayer(["3c", "5s", "4s", "2s"])
      .addPlayer(["7c", "9c", "Kd", "Js"])
      .boardAction((board: Board) => {
        board
          .setFlop(["2d", "3d", "4h"])
          .setTurn("6d")
          .setRiver("Qc")
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 100.00);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 0);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 0);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 0);

    done();

  });

  it('TRIPS vs STRAIGHT', (done) => {
    const result = new Table()
      .addPlayer(["Th", "9h", "2s", "7d"])
      .addPlayer(["Tc", "9c", "8c", "7c"])
      .boardAction((board: Board) => {
        board
          .setFlop(["Ac", "As", "8h"])
          .setTurn("7h")
          .setRiver("Jh")
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 100.00);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 0);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 0);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 0);

    done();

  });

  it('TRIPS vs STRAIGHT 2', (done) => {
    const result = new Table()
      .addPlayer(["Th", "9h", "2s", "7d"])
      .addPlayer(["Tc", "9c", "8c", "7c"])
      .boardAction((board: Board) => {
        board
          .setFlop(["Ac", "As", "8h"])
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 5.85);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 63.90);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 30.24);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 30.24);

    done();

  });

  it('TRIPS vs STRAIGHT 3', (done) => {
    const result = new Table()
      .addPlayer(["Th", "9h", "2s", "7d"])
      .addPlayer(["Tc", "9c", "8c", "7c"])
      .boardAction((board: Board) => {
        board
          .setFlop(["Ac", "As", "7h"])
          .setTurn("Jh")
        //.setRiver("7h")
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 22.50);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 10.00);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 67.50);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 67.50);

    done();

  });

  it('RANDOM 2', (done) => {
    const result = new Table()
      .addPlayer(["8d", "4s", "3d", "4c"])
      .addPlayer(["Qh", "Kh", "3h", "7c"])
      .boardAction((board: Board) => {
        board
          .setFlop(["9c", "Js", "9d"])
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 56.59);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 43.41);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 0);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 0);

    done();

  });

  it('RANDOM 3', (done) => {
    const result = new Table()
      .addPlayer(["7d", "8c", "6h", "5h"])
      .addPlayer(["Js", "9s", "Qd", "7c"])
      .boardAction((board: Board) => {
        board
          .setFlop(["Jh", "Th", "9c"])
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 64.88);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 35.12);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 0);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 0);

    done();

  });

  it('50/50', (done) => {
    const result = new Table()
      .addPlayer(["7s", "6s", "5s", "4s"])
      .addPlayer(["7d", "6d", "5d", "4d"])
      .calculate();
    assert.equal(Math.round(result.getPlayers()[0].getWinsPercentage()), 5);
    assert.equal(Math.round(result.getPlayers()[1].getWinsPercentage()), 5);
    assert.equal(Math.round(result.getPlayers()[0].getTiesPercentage()), 90);
    assert.equal(Math.round(result.getPlayers()[1].getTiesPercentage()), 90);

    done();

  }).timeout(3e3);

  it('EXHAUSTIVE', (done) => {
    const result = new Table()
      .addPlayer(["9h", "7s", "6d", "3d"])
      .addPlayer(["Ts", "Qc", "Td", "6c"])
      .exhaustive()
      .calculate();
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 35.15);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 64.71);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 0.14);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 0.14);

    done();

  }).timeout(2e4);

  it('Bug af77e24112120d83bc5b57d327068f9fe53fffa7 1', (done) => {
    const result = new Table()
        .addPlayer(['Ac', 'Ad', 'As', 'Ah'])
        .addPlayer(['2c', '2d', '2s', '2h'])
        .calculate();
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 100.00);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 0);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 0);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 0);

    done();
  }).timeout(3e3);

  it('Bug af77e24112120d83bc5b57d327068f9fe53fffa7 2', (done) => {
    const result = new Table()
        .addPlayer(['As', 'Ah', 'Kh', 'Ks'])
        .addPlayer(['2c', '2d', '2s', '2h'])
        .calculate();
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 100.00);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 0);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 0);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 0);

    done();
  }).timeout(3e3);

});
