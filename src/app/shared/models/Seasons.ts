import { ICountry, ILeague } from './ICountry';
import { IPaging } from './Standings';

export interface ISeasonResponse {
  get: string;
  parameters: ISeasonParameters;
  errors: string[];
  results: number;
  paging: IPaging;
  response: ISeasonsLeague[];
}

export interface ISeasonParameters {
  current: boolean;
}

export interface ISeasonsLeague {
  league: ILeague;
  country: ICountry;
  seasons: ISeason[];
}

export interface ISeason {
  current: boolean;
  year: string;
}
