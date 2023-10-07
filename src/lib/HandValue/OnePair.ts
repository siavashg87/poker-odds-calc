import Card from "../Card";
import Game from "../Game";
import {Nullable} from "../Interfaces";

export default function OnePair(game: Game, cards: Array<Card>, suits: { [key: string]: Array<Card> }, num_groups: Array<Array<Card>>, player_cards: Array<Card>, board: Array<Card>): Nullable<Array<Card>> {

  let pair = num_groups.find(g => g.length === 2) as Array<Card>;

  if (pair) {
    if (game.isOmaha() || game.isOmaha5Cards() || game.isOmaha6Cards()) {

      const matches = player_cards.filter(pc => !!pair.find(m => m.toString() === pc.toString()));
      const ln = matches.length;

      player_cards.sortCards();
      board.sortCards();

      let op: Nullable<Array<Card>> = null;
      if (ln === 2) {
        op = board.slice(0, 3)
      }
      else if (ln === 1) {
        op = [
          ...board.filter(c => !pair.find(ngc => c.toString() === ngc.toString())).slice(0, 2),
          player_cards.find(c => !pair.find(ngc => c.toString() === ngc.toString())) as Card
        ]
      }
      else if (ln === 0) {
        op = [
          board.find(c => !pair.find(ngc => c.toString() === ngc.toString())) as Card,
          ...player_cards.slice(0, 2)
        ]
      }

      if (op) {
        op.sortCards();
        return [...pair, ...op];
      }

    }
    else {
      return [...pair, ...cards.filter(card => {
        return card.getNum() !== pair[0].getNum();
      }).slice(0, 3)];
    }
  }
  return null;
}