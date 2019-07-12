import Card from "../Card";
import Game from "../Game";

export default function hasFlush(game: Game, cards: Array<Card>, suits: { [key: string]: Array<Card> }, num_groups: Array<Array<Card>>, player_cards: Array<Card>, board: Array<Card>): Array<Card> {
  let match, ln;
  for (let suit in suits) {
    if (
      suits[suit].length >= 5
      && (ln = (match = suits[suit].filter(c => !c.isLowAce())).length) >= 5
    ) {
      if (game.isOmaha()) {
        const player_cards_in_play = player_cards.filter(pc => !!suits[suit].find(m => m.toString() === pc.toString()));
        if (player_cards_in_play.length < 2)
          continue;
        const board_cards_in_play = board.filter(pc => !!suits[suit].find(m => m.toString() === pc.toString()));
        if (board_cards_in_play.length < 3)
          continue;
        player_cards_in_play.sortCards();
        board_cards_in_play.sortCards();
        return [...player_cards_in_play.slice(0, 2), ...board_cards_in_play.slice(0, 3)].sortCards()
      }
      else
        return match.slice(0, 5)
    }
  }
  return null;
}