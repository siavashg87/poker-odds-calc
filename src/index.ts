import Table from "./lib/Table";
import "./lib/Utils";

export class TexasHoldem extends Table {
  constructor() {
    super("texas_holdem");
  }
}

export class SixPlusHoldem extends Table {
  constructor() {
    super("sixplus_holdem");
  }
}

export class Omaha extends Table {
  constructor() {
    super("omaha");
  }
}

export class OmahaFiveCards extends Table {
  constructor() {
    super("omaha_5cards");
  }
}

export class OmahaSixCards extends Table {
  constructor() {
    super("omaha_6cards");
  }
}
