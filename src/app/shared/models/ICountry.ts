import { IStanding } from './Standings';

export interface ICountry {
  name: string;
  league: number;
}

export interface ILeague {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  standings: IStanding[][];
}
