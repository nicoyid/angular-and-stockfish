import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockfishService } from '../stockfish.service';
import { ChessMove, ComputerConfiguration } from '../models';
import { Color } from '../chess-logic/models';

@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="analysis">
      <h2>Analysis</h2>
      <div>
        <label>
          FEN:
          <input [(ngModel)]="fen" placeholder="Enter FEN position">
        </label>
      </div>
      <div>
        <label>
          Computer Color:
          <select [(ngModel)]="computerColor">
            <option [ngValue]="Color.White">White</option>
            <option [ngValue]="Color.Black">Black</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Difficulty Level:
          <select [(ngModel)]="difficultyLevel">
            <option *ngFor="let level of [1,2,3,4,5]" [ngValue]="level">{{level}}</option>
          </select>
        </label>
      </div>
      <button (click)="analyze()">Analyze Position</button>
      <div *ngIf="bestMove">
        <p>Best move: {{formatMove(bestMove)}}</p>
      </div>
    </div>
  `,
})
export class AnalysisComponent implements OnInit {
  fen: string = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  computerColor: Color = Color.Black;
  difficultyLevel: number = 1;
  bestMove: ChessMove | null = null;
  Color = Color;

  constructor(private stockfishService: StockfishService) {}

  ngOnInit() {
    this.updateComputerConfiguration();
  }

  updateComputerConfiguration() {
    const config: ComputerConfiguration = {
      color: this.computerColor,
      level: this.difficultyLevel
    };
    this.stockfishService.computerConfiguration$.next(config);
  }

  analyze() {
    this.updateComputerConfiguration();
    this.stockfishService.getBestMove(this.fen).subscribe(
      (move: ChessMove) => {
        this.bestMove = move;
      },
      (error: any) => {
        console.error('Analysis error:', error);
      }
    );
  }

  formatMove(move: ChessMove): string {
    const files = 'abcdefgh';
    const ranks = '12345678';
    const from = `${files[move.prevY]}${ranks[move.prevX]}`;
    const to = `${files[move.newY]}${ranks[move.newX]}`;
    return `${from}-${to}${move.promotedPiece ? '=' + move.promotedPiece : ''}`;
  }
}