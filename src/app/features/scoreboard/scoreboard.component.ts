import { Observable } from 'rxjs';
import { ScoreboardService } from 'src/app/core/providers/services/scoreboard/scoreboard.service';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreComponent } from './components/score/score.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { IScoreBoard } from 'src/app/shared/models/ScoreBoard';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Location } from '@angular/common';

@Component({
  selector: 'app-scoreboard',
  standalone: true,
  imports: [CommonModule, ScoreComponent, MatGridListModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent implements OnInit {
  scoreboards$: Observable<IScoreBoard[]>;
  leagueId: number;
  teamId: number;

  private scoreboardService: ScoreboardService = inject(ScoreboardService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private location: Location = inject(Location);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.leagueId = params['league'];
      this.teamId = params['team'];
      this.scoreboards$ = this.scoreboardService.getScoreboard(this.leagueId, this.teamId, 10);
    });
  }

  back() {
    this.location.back();
  }
}
