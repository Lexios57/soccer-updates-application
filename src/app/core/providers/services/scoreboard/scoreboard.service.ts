import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { Queries } from 'src/app/core/constants/api';
import { IScoreBoard, IScoreboardResponse } from 'src/app/shared/models/ScoreBoard';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ScoreboardService {
  cacheMap: { [id: string]: Observable<IScoreBoard[]> } = {};

  private readonly httpClient: HttpClient = inject(HttpClient);

  getTeamScoreboard(leagueId: number, teamId: number, last: number) {
    return this.httpClient.get<IScoreboardResponse>(
      environment.BASE_URL + Queries.FIXTURES + '?league=' + leagueId + '&team=' + teamId + '&last=' + last
    );
  }

  getScoreboard(leagueId: number, teamId: number, last: number): Observable<IScoreBoard[]> {
    if (!this.cacheMap['team=' + teamId]) {
      this.cacheMap['team=' + teamId] = this.requestScoreboard(leagueId, teamId, last).pipe(shareReplay());
    }
    return this.cacheMap['team=' + teamId];
  }

  requestScoreboard(leagueId: number, teamId: number, last: number) {
    return this.getTeamScoreboard(leagueId, teamId, last).pipe(map(_scores => _scores.response));
  }
}
