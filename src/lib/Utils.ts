import Card from "./Card";

export module Log {

  const CONSOLE_COLORS: { [key: string]: string } = {
    red: '31',
    green: '32',
    yellow: '33',
    blue: '34',
    magenta: '35',
    cyan: '36',
    white: '37',
    grey: '90'
  };

  export function PrintLn(l: string = "", c: string = null) {
    if (!l)
      return console.log('');
    if (c)
      return console.log(` ${color(l, c)}`);
    console.log(` ${l}`)
  }

  export function color(l: string, c: string = null) {
    return !c || !CONSOLE_COLORS[c] ? l : `\x1b[${CONSOLE_COLORS[c]}m${l}\x1b[0m`;
  }

}

export function toPercent(num: number): number {
  return (Math.round(num * 10000) / 100)
}

export function CardsFromString(str: string): Array<string> {
  return str.split(/(?=[AKQJT2-9.][schd.])/)
}

Object.defineProperty(Array.prototype, 'sortCards', {
  configurable: true,
  value: function sortCards() {
    return this.sort((a: Card, b: Card) => b.getRank() - a.getRank());
  },
  writable: true
});

Object.defineProperty(Array.prototype, 'sortPairs', {
  configurable: true,
  value: function sortPairs() {
    return this.sort((a: Array<Card>, b: Array<Card>) => b[0].getRank() - a[0].getRank())
  },
  writable: true
});

export function flatUnique(nested: Array<Array<Card>>): Array<Array<Card>> {
  let _arrays: Array<Array<Card>> = [];
  let arrays = nested[0].map(a => [a]);
  for (let i = 1, j = nested.length; i < j; i++) {
    const ln = nested[i].length;
    for (let i2 = 0; i2 < ln; i2++) {
      arrays.forEach(arr => {
        _arrays.push([...arr.slice(0), nested[i][i2]])
      });

    }
    arrays = _arrays.slice(0);
    _arrays = [];
  }
  return arrays;
}