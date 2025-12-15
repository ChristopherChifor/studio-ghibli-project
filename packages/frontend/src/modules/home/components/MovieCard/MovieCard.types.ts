import { Film } from '~/graphql/gen/graphql';

export enum CardState {
  RESTING = 'resting',
  LOADED = 'loaded',
  EXPANDED = 'expanded',
}

export interface FilmConfig {
  id: string;
  title: string;
  color: string;
}

export interface MovieCardProps {
  filmConfig: FilmConfig;
}

export type FilmData = NonNullable<Film>;
