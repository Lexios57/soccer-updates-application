import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandingsComponent } from './components/standings/standings.component';
import { ActivatedRoute } from '@angular/router';
import { StandingService } from 'src/app/core/providers/services/standing/standing.service';
import { Observable } from 'rxjs';
import { IStanding } from 'src/app/shared/models/Standings';
import { SeasonService } from 'src/app/core/providers/services/season/season.service';
import { ISeason } from 'src/app/shared/models/Seasons';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
  imports: [CommonModule, StandingsComponent, MatProgressSpinnerModule],
})
export class LeaderboardComponent implements OnInit {
  standings$: Observable<IStanding[]>;
  currentSeason: ISeason;
  leagueId: number;

  private route: ActivatedRoute = inject(ActivatedRoute);
  private standingService: StandingService = inject(StandingService);
  private seasonService: SeasonService = inject(SeasonService);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.leagueId = params['league'];
      if (this.leagueId) {
        this.seasonService.getCurrentSeason(this.leagueId).subscribe(season => {
          this.standings$ = this.standingService.getStandings(this.leagueId, season.year);
        });
      }
    });
  }
}
