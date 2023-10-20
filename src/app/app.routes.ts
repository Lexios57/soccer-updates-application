import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'leaderboard' },
  {
    path: 'leaderboard',
    loadComponent: () => import('./features/leaderboard/leaderboard.component').then(mod => mod.LeaderboardComponent),
  },
  {
    path: 'scoreboard',
    loadComponent: () => import('./features/scoreboard/scoreboard.component').then(mod => mod.ScoreboardComponent),
  },
];
