import Card from "../Card";
import Game from "../Game";

export default function Quads(game: Game, cards: Array<Card>, suits: { [key: string]: Array<Card> }, num_groups: Array<Array<Card>>, player_cards: Array<Card>, board: Array<Card>): Array<Card> {
  let matches = num_groups.filter(g => g.length === 4);
  if (matches.length > 0) {

    for (const match of matches) {

      if (game.isOmaha()) {
        const player_card_matches = player_cards.filter(pc => !!match.find(m => m.toString() === pc.toString())).length;
        if (player_card_matches === 2) {
          const highest_board_kicker = board
            .sortCards()
            .filter(card => {
              return card.getNum() !== match[0].getNum();
            })[0];

          return [...match, highest_board_kicker];
        }
        else if (player_card_matches === 1) {
          const highest_hand_kicker = player_cards
            .sortCards()
            .filter(card => {
              return card.getNum() !== match[0].getNum();
            })[0];

          return [...match, highest_hand_kicker];
        }
      }
      else {

        const highest_kicker = cards.filter(card => {
          return card.getNum() !== match[0].getNum();
        })[0];

        return [...match, highest_kicker]
      }
    }
  }
  return null;
}