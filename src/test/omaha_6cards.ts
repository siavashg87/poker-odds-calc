import {OmahaSixCards as Table} from "../index";
import Board from "../lib/Board";
import * as assert from "assert";

describe("Texas Omaha - 6 cards", function () {

  it('Bug 3e10fcd557473758c98312671af282604f5fc494 1', (done) => {
    const result = new Table()
      .addPlayer(['Ah', 'Kh', 'Kd', '9c', '4s', '3s'])
      .addPlayer(['As', 'Ad', 'Td', '7d', '4h', '2c'])
      .boardAction((board: Board) => {
        board
          .setFlop(["9s", "7c", "4d"])
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 59.76);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 40.24);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 0);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 0);

    done();
  });

  it('Bug 3e10fcd557473758c98312671af282604f5fc494 2', (done) => {
    const result = new Table()
      .addPlayer(['As', 'Ad', 'Td', '7d', '4h', '2c'])
      .addPlayer(['Ah', 'Kh', 'Kd', '9c', '4s', '3s'])
      .boardAction((board: Board) => {
        board
          .setFlop(["9s", "7c", "4d"])
          .setTurn('2s')
          .setRiver('Qh')
      })
      .calculate();
    assert.equal(result.getPlayers()[0].getWinsPercentage(), 0);
    assert.equal(result.getPlayers()[1].getWinsPercentage(), 100);
    assert.equal(result.getPlayers()[0].getTiesPercentage(), 0);
    assert.equal(result.getPlayers()[1].getTiesPercentage(), 0);

    done();
  });

});
