import {SixPlusHoldem as Table} from "../index";
import * as assert from "assert";

describe("Texas Hold'em - short deck", function () {

  it('STRAIGHT FLUSH', (done) => {
    const result = new Table()
      .addPlayer(["Qs", "Ks"])
      .addPlayer(["Qd", "Kd"])
      .boardAction(board => {
        board
          .setFlop(["Js", "Ts", "6h"])
          .setTurn("Td")
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 17.86);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 0);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 82.14);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 82.14);

    done();

  });

  it('STRAIGHT FLUSH - DOUBLE', (done) => {
    const result = new Table()
      .addPlayer(["Ts", "Ks"])
      .addPlayer(["8s", "Kd"])
      .boardAction(board => {
        board
          .setFlop(["6s", "7s", "8h"])
          .setTurn("9s")
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWins(), 27);
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 96.43);
    assert.equal(result.getPlayers()[1].getWins(), 1);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 3.57);
    assert.equal(result.getPlayers()[0].getTies(), 0);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 0);
    assert.equal(result.getPlayers()[1].getTies(), 0);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 0);

    done();

  });

  it('FULL HOUSE', (done) => {
    const result = new Table()
      .addPlayer(["8d", "8c"])
      .addPlayer(["9d", "9c"])
      .boardAction(board => {
        board
          .setFlop(["8h", "Ks", "Ad"])
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 81.53);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 18.47);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 0);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 0);

    done();

  });

  it('FLUSH', (done) => {
    const result = new Table()
      .addPlayer(["7d", "Td"])
      .addPlayer(["Jc", "Qc"])
      .boardAction(board => {
        board
          .setFlop(["Jd", "6d", "Qd"])
        //.setTurn("8d")
        //.setRiver("Jh")
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 99.51);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 0.49);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 0);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 0);

    done();

  });

  it('STRAIGHT', (done) => {
    const result = new Table()
      .addPlayer(["9d", "Tc"])
      .addPlayer(["6d", "6c"])
      .boardAction(board => {
        board
          .setFlop(["8h", "Js", "Ad"])
        //.setTurn("As")
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 73.40);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 22.17);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 4.43);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 4.43);

    done();

  });

  it('STRAIGHT - Trips Beat Straight', (done) => {
    const result = new Table()
      .addPlayer(["9d", "Tc"])
      .addPlayer(["6d", "6c"])
      .tripsBeatsStraight()
      .boardAction(board => {
        board
          .setFlop(["8h", "Js", "Ad"])
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 69.46);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 26.11);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 4.43);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 4.43);

    done();

  });

  it('TRIPS', (done) => {
    const result = new Table()
      .addPlayer(["Kd", "Kc"])
      .addPlayer(["6d", "6c"])
      .boardAction(board => {
        board
          .setFlop(["6h", "Ks", "Ad"])
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 93.35);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 6.65);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 0);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 0);

    done();

  });

  it('TWO PAIRS', (done) => {
    const result = new Table()
      .addPlayer(["Ad", "6c"])
      .addPlayer(["Kd", "Qc"])
      .boardAction(board => {
        board
          .setFlop(["Ah", "6s", "Ks"])
          .setTurn("Qh")
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 85.71);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 14.29);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 0);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 0);

    done();

  });

  it('ONE PAIR', (done) => {
    const result = new Table()
      .addPlayer(["Ad", "6c"])
      .addPlayer(["Qd", "Kc"])
      .boardAction(board => {
        board
          .setFlop(["6h", "Ks", "8d"])
          .setTurn("Jd")
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 17.86);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 82.14);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 0);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 0);

    done();

  });

  it('STRAIGHT', (done) => {
    const result = new Table()
      .addPlayer(["Ad", "Jc"])
      .addPlayer(["6d", "Kc"])
      .boardAction(board => {
        board
          .setFlop(["Th", "7s", "8d"])
          .setTurn("9h")
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 89.29);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 0);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 10.71);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 10.71);

    done();

  });

  it('TREE WAYS', (done) => {
    const result = new Table()
      .addPlayer(["6s", "6d"])
      .addPlayer(["Ts", "Td"])
      .addPlayer(["Ks", "Kd"])
      .boardAction(board => {
        board
          .setFlop(["As", "8s", "Qh"])
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 16.81);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 17.66);
    assert.equal(result.getPlayers()[2].getWinsPercentage(), 65.53);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 0);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 0);
    assert.equal(result.getPlayers()[2].getTiesPercentage(), 0);

    done();

  });

  it('TRIPS vs STRAIGHT', (done) => {
    const result = new Table()
      .addPlayer(["6d", "6c"])
      .addPlayer(["7d", "8c"])
      .boardAction(board => {
        board
          .setFlop(["6h", "9c", "Td"])
          .setTurn("Qd")
          .setRiver("Kc")
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 0);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 100.00);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 0);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 0);

    done();

  });

  it('TRIPS vs STRAIGHT - added rules', (done) => {
    const result = new Table()
      .addPlayer(["6d", "6c"])
      .addPlayer(["7d", "8c"])
      .tripsBeatsStraight()
      .boardAction(board => {
        board
          .setFlop(["6h", "9c", "Td"])
          .setTurn("Qd")
          .setRiver("Kc")
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 100.00);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 0);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 0);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 0);

    done();

  });

  it('Random Test 1', (done) => {
    const result = new Table()
      .addPlayer(["Ah", "Ad"])
      .addPlayer(["Ac", "Kc"])
      .boardAction(board => {
        board
          .setFlop(["6c", "Td", "8c"])
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWins(), 255);
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 62.81);
    assert.equal(result.getPlayers()[0].getTies(), 9);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 2.22);
    assert.equal(result.getPlayers()[1].getWins(), 142);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 34.98);
    assert.equal(result.getPlayers()[1].getTies(), 9);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 2.22);

    done();

  });

  it('EXHAUSTIVE', (done) => {
    const result = new Table()
      .addPlayer(["6s", "7s"])
      .addPlayer(["6d", "7d"])
      .exhaustive()
      .calculate();
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 5.65);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 5.65);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 88.69);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 88.69);

    done();

  }).timeout(2e4);

});