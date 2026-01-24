declare class Mojibake {
  constructor();
  encode(input: string): string;
  decode(input: string): string;
}

export = Mojibake;
