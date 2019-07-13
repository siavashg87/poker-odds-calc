import Table from "./Table";
import Card from "./Card";
import Player from "./Player";
import {Games as iGames, AvailableGames} from "./Interfaces";
import * as HandValue from "./HandValue/index";

export default class Game {

  private trips_beats_straight = false;

  constructor(private game: iGames, private Table: Table) {
    if (!~AvailableGames.indexOf(game))
      throw new Error(`${game} not available! Choose any of ${AvailableGames.join(", ")}`);
  }

  isTexasHoldem() {
    return this.game == "texas_holdem";
  }

  isSixPlusTexasHoldem() {
    return this.game == "sixplus_holdem";
  }

  isOmaha() {
    return this.game == "omaha";
  }

  getGame() {
    return this.game;
  }

  tripsBeatsStraight() {
    if (!this.isSixPlusTexasHoldem())
      throw new Error("Option \"Trip beats straight\" is available for 6+ hold'em only!");
    this.trips_beats_straight = true;
    return this;
  }

  doesTripsBeatStraight() {
    return this.trips_beats_straight;
  }

  getResult(players: Array<Player>, board: Array<Card>) {
    return players.map((player: Player) => this.getHandStrentgh(board, player.getCards()));
  }

  private getHandStrentgh(board: Array<Card>, player_cards: Array<Card>) {

    const cards = [...board, ...player_cards].sortCards();

    let _cards = cards.slice(0);

    let suits = {
      h: [],
      d: [],
      c: [],
      s: []
    } as { [key: string]: Array<Card> };

    let num_groups: Array<Array<Card>> = [];

    _cards.forEach((card: Card) => {
      if (card.isAce() && !card.isLowAce()) {
        const AceOne = new Card(card.getSuit(), "A", this).setAsLowAce();
        cards.push(AceOne);
        suits[AceOne.getSuit()].push(AceOne);
      }
      suits[card.getSuit()].push(card);

      let index;
      if ((index = num_groups.findIndex(g => g[0].getNum() === card.getNum())) > -1)
        num_groups[index].push(card);
      else
        num_groups.push([card]);
    });

    let rank = "";
    let rank_str = "HIGH_CARD";

    let hand;

    if ((hand = HandValue.StraightFlush(this, cards, suits, num_groups, player_cards)) !== null) {
      if (hand[0].getNum() === "T") {
        rank = "10";
        rank_str = "ROYAL_FLUSH";
      }
      else {
        rank = "9";
        rank_str = "STRAIGHT_FLUSH";
      }
    }
    else if ((hand = HandValue.Quads(this, cards, suits, num_groups, player_cards, board)) !== null) {
      rank = "8";
      rank_str = "QUADS";
    }


    else if (!this.isSixPlusTexasHoldem() && (hand = HandValue.FullHouse(this, cards, suits, num_groups, player_cards, board)) !== null) {
      rank = "7";
      rank_str = "FULL_HOUSE";
    }
    else if (!this.isSixPlusTexasHoldem() && (hand = HandValue.Flush(this, cards, suits, num_groups, player_cards, board)) !== null) {
      rank = "6";
      rank_str = "FLUSH";
    }
    else if (!this.isSixPlusTexasHoldem() && (hand = HandValue.Straight(this, cards, suits, num_groups, player_cards)) !== null) {
      rank = "5";
      rank_str = "STRAIGHT";
    }
    else if (!this.isSixPlusTexasHoldem() && (hand = HandValue.TreeOfAKind(this, cards, suits, num_groups, player_cards, board)) !== null) {
      rank = "4";
      rank_str = "TREE_OF_A_KIND";
    }


    else if (this.isSixPlusTexasHoldem() && (hand = HandValue.Flush(this, cards, suits, num_groups, player_cards, board)) !== null) {
      rank = "7";
      rank_str = "FLUSH";
    }
    else if (this.isSixPlusTexasHoldem() && (hand = HandValue.FullHouse(this, cards, suits, num_groups, player_cards, board)) !== null) {
      rank = "6";
      rank_str = "FULL_HOUSE";
    }


    else if (this.isSixPlusTexasHoldem() && this.doesTripsBeatStraight() && (hand = HandValue.TreeOfAKind(this, cards, suits, num_groups, player_cards, board)) !== null) {
      rank = "5";
      rank_str = "TREE_OF_A_KIND";
    }
    else if (this.isSixPlusTexasHoldem() && this.doesTripsBeatStraight() && (hand = HandValue.Straight(this, cards, suits, num_groups, player_cards)) !== null) {
      rank = "4";
      rank_str = "STRAIGHT";
    }


    else if (this.isSixPlusTexasHoldem() && !this.doesTripsBeatStraight() && (hand = HandValue.Straight(this, cards, suits, num_groups, player_cards)) !== null) {
      rank = "5";
      rank_str = "STRAIGHT";
    }
    else if (this.isSixPlusTexasHoldem() && !this.doesTripsBeatStraight() && (hand = HandValue.TreeOfAKind(this, cards, suits, num_groups, player_cards, board)) !== null) {
      rank = "4";
      rank_str = "TREE_OF_A_KIND";
    }


    else if ((hand = HandValue.TwoPairs(this, cards, suits, num_groups, player_cards, board)) !== null) {
      rank = "3";
      rank_str = "TWO_PAIRS";
    }
    else if ((hand = HandValue.OnePair(this, cards, suits, num_groups, player_cards, board)) !== null) {
      rank = "2";
      rank_str = "ONE_PAIR";
    }
    else {
      rank = "0";
      hand = HandValue.HighCards(this, cards, suits, num_groups, player_cards, board);
      rank_str = "HIGH_CARDS";
    }

    let points = rank;
    hand.forEach(card => {
      points += card.getRank(true);
    });

    return {
      points: parseInt(points),
      rank: {
        rank,
        str: rank_str
      },
      hand,
      cards
    };
  }

}


