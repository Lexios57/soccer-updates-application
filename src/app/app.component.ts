import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CountrySelectorComponent } from './core/components/country-selector/country-selector.component';
import { HttpClientModule } from '@angular/common/http';
import { ScoreboardService } from './core/providers/services/scoreboard/scoreboard.service';
import { StandingService } from './core/providers/services/standing/standing.service';
import { SeasonService } from './core/providers/services/season/season.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CountrySelectorComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ScoreboardService, StandingService, SeasonService],
})
export class AppComponent {
  title = 'soccer-updates-application';
}
