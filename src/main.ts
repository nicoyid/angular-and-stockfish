import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { ChessboardComponent } from './app/chessboard/chessboard.component';
import { AnalysisComponent } from './app/analysis/analysis.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ChessboardComponent, AnalysisComponent],
  template: `
    <div class="container">
      <h1>Chess Analysis App</h1>
      <app-chessboard></app-chessboard>
      <app-analysis></app-analysis>
    </div>
  `,
})
export class App {
  title = 'Chess Analysis App';
}

bootstrapApplication(App, {
  providers: [
    provideHttpClient()
  ]
}).catch(err => console.error(err));