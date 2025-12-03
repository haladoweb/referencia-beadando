import { Position } from 'geojson';

export interface Building {
  id?: string;
  name: string;
  fullName: string;
  description: string;
  boundary: Position[][];
}

export interface ClassRoom {
  id?: string;
  buildingId: string;
  name: string;
  capacity: number;
  type: ClassRoomType;
}

export enum ClassRoomType {
  PC = 'Pc',
  Basic = 'Basic',
  Auditorium = 'Auditorium',
}
