import { ILeague } from './ICountry';
import { IPaging, ITeam } from './Standings';

export interface IScoreboardResponse {
  get: string;
  parameters: IScoreboardParameters;
  errors: string[];
  results: number;
  paging: IPaging;
  response: IScoreBoard[];
}

export interface IScoreboardParameters {
  league: string;
  team: string;
  last: string;
}

export interface IScoreBoard {
  league: ILeague;
  teams: ITeams;
  goals: IResults;
}

export interface ITeams {
  home: ITeam;
  away: ITeam;
}

export interface IResults {
  home: number;
  away: number;
}
