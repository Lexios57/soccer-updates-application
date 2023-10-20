import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { IStanding, ITeam } from 'src/app/shared/models/Standings';
import { Router } from '@angular/router';

@Component({
  selector: 'app-standings',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss'],
})
export class StandingsComponent {
  @Input() leagueId: number;
  @Input() standings: IStanding[];
  displayedColumns: string[] = [
    'position',
    'logo',
    'name',
    'games',
    'win',
    'losses',
    'draws',
    'goalDifference',
    'points',
  ];

  private router: Router = inject(Router);

  showScoreboard(team: ITeam) {
    this.router.navigate(['/scoreboard'], { queryParams: { team: team.id }, queryParamsHandling: 'merge' });
  }
}
