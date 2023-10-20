import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { IScoreBoard } from 'src/app/shared/models/ScoreBoard';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [CommonModule, MatGridListModule],
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent implements OnInit {
  @Input() score: IScoreBoard;
  @Input() selectedTeamId: number;
  colorClass: string;

  ngOnInit(): void {
    this.colorClass = this.changeColor();
  }

  changeColor() {
    if (this.score.goals.home == this.score.goals.away) {
      return 'egality';
    } else if (this.selectedTeamId == this.score.teams.home.id && this.score.goals.home > this.score.goals.away) {
      return 'win-match';
    } else if (this.selectedTeamId != this.score.teams.home.id && this.score.goals.home < this.score.goals.away) {
      return 'win-match';
    } else return 'lost-match';
  }
}
