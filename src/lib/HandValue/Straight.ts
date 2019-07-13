import Card from "../Card";
import {flatUnique} from "../Utils";
import Game from "../Game";

export default function Straight(game: Game, cards: Array<Card>, suits: { [key: string]: Array<Card> }, num_groups: Array<Array<Card>>, player_cards: Array<Card>): Array<Card> {
  let match: Array<Card> = [];
  let match_omaha: Array<Array<Card>> = [];
  for (let i = 0, j = cards.length; i < j; i++) {
    if (i === 0) {
      match = [cards[i]];
      match_omaha = [[cards[i]]];
    }
    else {
      const this_card = cards[i];
      const prev_card = match[match.length - 1];
      let ln = match.length;
      if (this_card.getRank() === prev_card.getRank()) {
        match_omaha[match_omaha.length - 1].push(this_card);
      }
      else if ((this_card.getRank() + 1) === prev_card.getRank()) {
        match.push(this_card);
        match_omaha.push([this_card]);
        ln++;
      }
      else if (ln < 5) {
        match = [this_card];
        match_omaha = [[this_card]];
      }

      if (ln >= 5) {
        if (game.isOmaha()) {
          const omaha_matches = flatUnique(match_omaha.slice(ln - 5, ln));
          for (let omaha_match of omaha_matches) {
            if (player_cards.filter(pc => !!omaha_match.find(m => m.toString() === pc.toString())).length === 2)
              return omaha_match;
          }

        }
        else
          return match;
      }
    }
  }
  return null;
}