import Card from "../Card";
import Game from "../Game";

export default function Fullhouse(game: Game, cards: Array<Card>, suits: { [key: string]: Array<Card> }, num_groups: Array<Array<Card>>, player_cards: Array<Card>, board: Array<Card>): Array<Card> {
  let three_of_a_kinds = [];
  let pairs = [];
  for (let num_group of num_groups) {
    const ln = num_group.length;
    if (ln === 2)
      pairs.push(num_group);
    else if (ln >= 3)
      three_of_a_kinds.push(num_group);
  }
  if ((three_of_a_kinds.length * 10) + pairs.length < 11)
    return null;

  if (game.isOmaha()) {
    three_of_a_kinds.sortPairs();
    pairs.sortPairs();
    const all_combinations = [...three_of_a_kinds, ...pairs].sort((b, a) => b[0].getRank() - a[0].getRank());
    for (let three_of_a_kind of three_of_a_kinds) {
      for (let trips_or_pair of all_combinations) {
        if (three_of_a_kind[0].toString() !== trips_or_pair[0].toString()) {
          for (let i = 0, combo_ln = trips_or_pair.length; i < combo_ln - 1; i++) {
            const this_combo = [...three_of_a_kind.slice(0, 3), ...trips_or_pair.slice(i, i + 2)];
            if (player_cards.filter(pc => !!this_combo.find(m => m.toString() === pc.toString())).length === 2)
              return this_combo;
          }
        }
      }
    }
    return null;
  }
  if (three_of_a_kinds.length > 1)
    return [...three_of_a_kinds[0], ...three_of_a_kinds[1].slice(0, 2)];
  return [...three_of_a_kinds[0], ...pairs[0]];
}