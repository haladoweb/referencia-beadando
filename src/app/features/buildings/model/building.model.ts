import { Position } from 'geojson';

export interface Building {
  id?: string;
  name: string;
  fullName: string;
  description: string;
  boundary: Position[][];
  color: string;
}
