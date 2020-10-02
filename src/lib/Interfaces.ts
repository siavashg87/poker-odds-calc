export type Games = "texas_holdem" | "sixplus_holdem" | "omaha";
export type IHand = [string, string] | [string, string, string, string];
export type ISuit = Suits.CLUBS | Suits.SPADES | Suits.HEARTS | Suits.DIAMONDS;
export type Nullable<T> = T | null;
export const AvailableGames = ["texas_holdem", "sixplus_holdem", "omaha"];

export enum Suits {
  HEARTS = "h",
  CLUBS = "c",
  DIAMONDS = "d",
  SPADES = "s"
}

export const SuitsList = [
  Suits.CLUBS,
  Suits.HEARTS,
  Suits.SPADES,
  Suits.DIAMONDS
];

export enum CardNumbers {
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
  SEVEN = 7,
  EIGHT = 8,
  NINE = 9,
  TEN = "T",
  JACK = "J",
  QUEEN = "Q",
  KING = "K",
  ACE = "A"
}

export type ICardNumber = CardNumbers.TWO |
  CardNumbers.THREE |
  CardNumbers.FOUR |
  CardNumbers.FIVE |
  CardNumbers.SIX |
  CardNumbers.SEVEN |
  CardNumbers.EIGHT |
  CardNumbers.NINE |
  CardNumbers.TEN |
  CardNumbers.JACK |
  CardNumbers.QUEEN |
  CardNumbers.KING |
  CardNumbers.ACE

export const FullDeck = [
  CardNumbers.TWO,
  CardNumbers.THREE,
  CardNumbers.FOUR,
  CardNumbers.FIVE,
  CardNumbers.SIX,
  CardNumbers.SEVEN,
  CardNumbers.EIGHT,
  CardNumbers.NINE,
  CardNumbers.TEN,
  CardNumbers.JACK,
  CardNumbers.QUEEN,
  CardNumbers.KING,
  CardNumbers.ACE
];

export const SixPlusDeck = [
  CardNumbers.SIX,
  CardNumbers.SEVEN,
  CardNumbers.EIGHT,
  CardNumbers.NINE,
  CardNumbers.TEN,
  CardNumbers.JACK,
  CardNumbers.QUEEN,
  CardNumbers.KING,
  CardNumbers.ACE
];