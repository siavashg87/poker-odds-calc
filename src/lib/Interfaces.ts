export type Games = "texas_holdem" | "sixplus_holdem" | "omaha";
export type IHand = [string, string] | [string, string, string, string];
export type ISuit = "c" | "s" | "h" | "d";
export type Nullable<T> = T | null;
export const AvailableGames = ["texas_holdem", "sixplus_holdem", "omaha"];