import Card from "../Card";
import Game from "../Game";
import {Nullable} from "../Interfaces";

export default function ThreeOfAKind(game: Game, cards: Array<Card>, suits: { [key: string]: Array<Card> }, num_groups: Array<Array<Card>>, player_cards: Array<Card>, board: Array<Card>): Nullable<Array<Card>> {
  for (let i in num_groups) {
    let num_group = num_groups[i];
    if (num_group.length >= 3) {
      if (game.isOmaha() || game.isOmaha5Cards() || game.isOmaha6Cards()) {
        const player_cards_used = player_cards.filter(pc => !!num_group.find(m => m.toString() === pc.toString()));
        const ln = player_cards_used.length;
        player_cards.sortCards();
        board.sortCards();
        let op = null;
        switch (ln) {
          case 0:
            op = player_cards.slice(0, 2);
            break;
          case 1:
            op = [
              player_cards.find(c => !num_group.find(ngc => c.toString() === ngc.toString())),
              board.find(c => !num_group.find(ngc => c.toString() === ngc.toString()))
            ].sortCards();
            break;
          case 2:
            op = board.filter(c => !num_group.find(ngc => c.toString() === ngc.toString())).slice(0, 2);
            break;
          case 3:
            if (num_group.length > 3) {
              num_group = num_group.slice(0, 3);
              op = board.filter(c => !num_group.find(ngc => c.toString() === ngc.toString())).slice(0, 2);
            }
            break;
        }

        if (op) {
          return [
            ...num_group.slice(0, 3),
            ...op
          ]
        }
      }
      else {
        return [
          ...num_group,
          ...cards.filter(card => {
            return card.getNum() !== num_group[0].getNum();
          }).slice(0, 2)
        ];
      }
    }
  }
  return null;
}