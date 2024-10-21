import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chess, Square, PieceSymbol } from 'chess.js';

interface ChessPiece {
  type: PieceSymbol;
  color: 'w' | 'b';
}

@Component({
  selector: 'app-chessboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="chessboard">
      <div *ngFor="let row of board; let i = index" class="row">
        <div *ngFor="let square of row; let j = index" 
             class="square" 
             [ngClass]="{'light': (i + j) % 2 === 0, 'dark': (i + j) % 2 !== 0}">
          <div *ngIf="square" class="piece" [innerHTML]="getPieceUnicode(square)"></div>
        </div>
      </div>
    </div>
    <div>
      <input [(ngModel)]="fen" placeholder="Enter FEN position">
      <button (click)="updatePosition()">Update Position</button>
    </div>
  `,
  styles: [`
    .chessboard {
      width: 400px;
      height: 400px;
      border: 2px solid #333;
      display: flex;
      flex-wrap: wrap;
    }
    .row {
      display: flex;
      width: 100%;
    }
    .square {
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 40px;
    }
    .light { background-color: #f0d9b5; }
    .dark { background-color: #b58863; }
  `]
})
export class ChessboardComponent implements OnInit {
  chess: Chess;
  fen: string = '';
  board: (ChessPiece | null)[][] = [];

  constructor() {
    this.chess = new Chess();
  }

  ngOnInit() {
    this.fen = this.chess.fen();
    this.updateBoard();
  }

  updatePosition() {
    try {
      this.chess.load(this.fen);
      this.updateBoard();
      console.log('Position updated:', this.fen);
    } catch (error) {
      console.error('Invalid FEN or error updating position:', error);
    }
  }

  updateBoard() {
    this.board = this.chess.board();
  }

  getPieceUnicode(piece: ChessPiece): string {
    const pieceUnicode: { [key: string]: string } = {
      'k': '&#9812;', 'q': '&#9813;', 'r': '&#9814;', 'b': '&#9815;', 'n': '&#9816;', 'p': '&#9817;',
      'K': '&#9818;', 'Q': '&#9819;', 'R': '&#9820;', 'B': '&#9821;', 'N': '&#9822;', 'P': '&#9823;'
    };
    return pieceUnicode[piece.color === 'w' ? piece.type.toUpperCase() : piece.type.toLowerCase()];
  }
}