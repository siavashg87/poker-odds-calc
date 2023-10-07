import Card from "../Card";
import Game from "../Game";
import {Nullable} from "../Interfaces";

export default function hasTwoPairs(game: Game, cards: Array<Card>, suits: { [key: string]: Array<Card> }, num_groups: Array<Array<Card>>, player_cards: Array<Card>, board: Array<Card>): Nullable<Array<Card>> {

  let pairs = num_groups.filter(g => g.length === 2);

  if (pairs.length >= 2) {

    if (pairs.length > 2) {
      pairs.sort((a, b) => {
        return b[0].getRank() - a[0].getRank();
      });
    }

    if (game.isOmaha() || game.isOmaha5Cards() || game.isOmaha6Cards()) {
      for (const top_pair of pairs) {
        for (const pair of pairs) {
          if (pair !== top_pair) {
            const this_combo = [
              ...top_pair,
              ...pair
            ];
            const matches = player_cards.filter(pc => !!this_combo.find(m => m.toString() === pc.toString()));
            const ln = matches.length;
            if (ln === 2) {
              board.sortCards();
              return [
                ...this_combo,
                board.find(c => !this_combo.find(ngc => c.toString() === ngc.toString())) as Card
              ];
            }
            else if (ln === 1) {
              player_cards.sortCards();
              return [
                ...this_combo,
                player_cards.find(c => !this_combo.find(ngc => c.toString() === ngc.toString())) as Card
              ];
            }
          }
        }
      }
    }
    else {
      return [
        ...pairs[0],
        ...pairs[1],
        ...[cards.filter(card => {
          return card.getNum() !== pairs[0][0].getNum() && card.getNum() !== pairs[1][0].getNum();
        })[0]]
      ];
    }
  }
  return null;
}
