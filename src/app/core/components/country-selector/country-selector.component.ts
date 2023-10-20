import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ICountry } from 'src/app/shared/models/ICountry';
import { Countries } from 'src/app/core/constants/countries';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country-selector',
  standalone: true,
  imports: [CommonModule, MatButtonToggleModule],
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.scss'],
})
export class CountrySelectorComponent {
  countries: ICountry[] = Countries;

  private router: Router = inject(Router);

  changeCountry(country: ICountry) {
    this.navigateToCountry(country.league);
  }

  navigateToCountry(leagueId: number) {
    this.router.navigate(['/'], {
      queryParams: {
        league: leagueId,
      },
    });
  }
}
