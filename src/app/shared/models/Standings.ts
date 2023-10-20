import { ILeague } from './ICountry';

export interface IStandingResponse {
  get: string;
  parameters: IParameters;
  errors: string[];
  results: number;
  paging: IPaging;
  response: IResponse[];
}

export interface IParameters {
  league: string;
  season: string;
}

export interface IPaging {
  current: number;
  total: number;
}

export interface IResponse {
  league: ILeague;
}

export interface IStanding {
  rank: number;
  team: ITeam;
  points: number;
  goalsDiff: number;
  group: string;
  form: string;
  status: string;
  description: string;
  all: IMatchs;
  home: IMatchs;
  away: IMatchs;
  update: string;
}

export interface ITeam {
  id: number;
  name: string;
  logo: string;
  winner: boolean;
}

export interface IGoals {
  for: number;
  against: number;
}

export interface IMatchs {
  played: number;
  win: number;
  draw: number;
  lose: number;
  goals: IGoals;
}
