import { Color } from './chess-logic/models';

export interface ChessMove {
  prevX: number;
  prevY: number;
  newX: number;
  newY: number;
  promotedPiece: FENChar | null;
}

export interface ComputerConfiguration {
  color: Color;
  level: number;
}

export interface StockfishQueryParams {
  fen: string;
  depth: number;
}

export interface StockfishResponse {
  bestmove: string;
}

export const stockfishLevels: { [key: number]: number } = {
  1: 1,
  2: 5,
  3: 10,
  4: 15,
  5: 20
};

export enum FENChar {
  WhitePawn = 'P',
  WhiteKnight = 'N',
  WhiteBishop = 'B',
  WhiteRook = 'R',
  WhiteQueen = 'Q',
  WhiteKing = 'K',
  BlackPawn = 'p',
  BlackKnight = 'n',
  BlackBishop = 'b',
  BlackRook = 'r',
  BlackQueen = 'q',
  BlackKing = 'k'
}