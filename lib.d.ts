import Card from "./src/lib/Card";

declare global {
  interface Array<T> {
    sortCards() : Array<Card>;
    sortPairs() : Array<Array<Card>>;
  }
}