import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, map, shareReplay } from 'rxjs';
import { Queries } from 'src/app/core/constants/api';
import { IStandingResponse } from 'src/app/shared/models/Standings';
import { IStanding } from 'src/app/shared/models/Standings';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StandingService {
  cacheMap: { [id: number]: Observable<IStanding[]> } = {};

  private readonly httpClient: HttpClient = inject(HttpClient);
  private snackBar: MatSnackBar = inject(MatSnackBar);

  getLeagueStandings(leagueId: number, season: string): Observable<IStandingResponse> {
    return this.httpClient.get<IStandingResponse>(
      environment.BASE_URL + Queries.STANDINGS + '?league=' + leagueId + '&season=' + season
    );
  }

  getStandings(leagueId: number, season: string): Observable<IStanding[]> {
    if (!this.cacheMap[leagueId]) {
      this.cacheMap[leagueId] = this.getLeaguesStandings(leagueId, season)?.pipe(shareReplay());
    }
    return this.cacheMap[leagueId];
  }

  getLeaguesStandings(leagueId: number, season: string) {
    const response: Observable<IStandingResponse> = this.getLeagueStandings(leagueId, season);
    response.subscribe(response => {
      if (response.results == 0) {
        this.snackBar.open("🚨 Erreur lié à l'API", 'Fermer', {
          panelClass: ['error-snackbar'],
          duration: 3000,
        });
      }
    });
    return response.pipe(map(_standing => _standing.response[0].league.standings[0]));
  }
}
