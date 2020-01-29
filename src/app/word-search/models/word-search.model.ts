export type Direction = 'up' | 'down' | 'left' | 'right';

export interface FoundWord {
  word: string;
  startPoint: string;
  endPoint: string;
  direction: Direction;
}
