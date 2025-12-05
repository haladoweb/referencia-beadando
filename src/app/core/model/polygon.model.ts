import { Position } from 'geojson';

export interface PolygonOptions {
  coordinates: Position[][];
  color: string;
  popUpTitle: string;
  popUpContent: string;
}
