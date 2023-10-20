import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { Queries } from 'src/app/core/constants/api';
import { Leagues } from 'src/app/core/constants/countries';
import { ISeason, ISeasonResponse, ISeasonsLeague } from 'src/app/shared/models/Seasons';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SeasonService {
  currentSeason$: Observable<ISeasonsLeague[]>;

  private readonly httpClient: HttpClient = inject(HttpClient);

  getSeason() {
    return this.httpClient.get<ISeasonResponse>(environment.BASE_URL + Queries.LEAGUES + '?current=true');
  }

  getCurrentSeason(leagueId: number): Observable<ISeason> {
    if (!this.currentSeason$) {
      this.currentSeason$ = this.requestSeason().pipe(shareReplay());
    }
    return this.currentSeason$.pipe(map(response => response.filter(res => res.league.id == leagueId)[0].seasons[0]));
  }

  requestSeason() {
    return this.getSeason().pipe(map(response => response.response.filter(res => Leagues.includes(res.league.id))));
  }
}
