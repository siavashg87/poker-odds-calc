import StraightFlush from "./StraightFlush";
import Quads from "./Quads";
import FullHouse from "./FullHouse";
import Flush from "./Flush";
import Straight from "./Straight";
import TreeOfAKind from "./TreeOfAKind";
import TwoPairs from "./TwoPairs";
import OnePair from "./OnePair";
import HighCards from "./HighCards";

export {
  StraightFlush,
  Quads,
  FullHouse,
  Flush,
  Straight,
  TreeOfAKind,
  TwoPairs,
  OnePair,
  HighCards
};

export const type = {
  ROYAL_FLUSH: "ROYAL_FLUSH",
  STRAIGHT_FLUSH: "STRAIGHT_FLUSH",
  QUADS: "QUADS",
  FULL_HOUSE: "FULL_HOUSE",
  FLUSH: "FLUSH",
  STRAIGHT: "STRAIGHT",
  TREE_OF_A_KIND: "TREE_OF_A_KIND",
  TWO_PAIRS: "TWO_PAIRS",
  ONE_PAIR: "ONE_PAIR",
  HIGH_CARDS: "HIGH_CARDS",
};

export const name: {[key: string]: string} = {
  ROYAL_FLUSH: "Royal Flush",
  STRAIGHT_FLUSH: "Straight Flush",
  QUADS: "4 of a kind",
  FULL_HOUSE: "Full House",
  FLUSH: "Flush",
  STRAIGHT: "Straight",
  TREE_OF_A_KIND: "3 of a kind",
  TWO_PAIRS: "Two Pairs",
  ONE_PAIR: "One Pair",
  HIGH_CARDS: "High Card",
};