import Card from "../Card";
import Game from "../Game";
import {Nullable} from "../Interfaces";

export default function getHighCards(game: Game, cards: Array<Card>, suits: { [key: string]: Array<Card> }, num_groups: Array<Array<Card>>, player_cards: Array<Card>, board: Array<Card>): Nullable<Array<Card>> {
  if (game.isOmaha() || game.isOmaha5Cards() || game.isOmaha6Cards()) {
    player_cards.sortCards();
    board.sortCards();
    return [
      ...player_cards.slice(0, 2),
      ...board.slice(0, 3)
    ].sortCards();
  }
  return cards.slice(0, 5);
}