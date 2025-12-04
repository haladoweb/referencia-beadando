import { Component, effect, input, OnInit, output, signal } from '@angular/core';
import { MapComponent } from '@maplibre/ngx-maplibre-gl';
import { Feature, Polygon, Position } from 'geojson';
import { StyleSpecification, Map as MapLibreMap, IControl } from 'maplibre-gl';
import MapLibreDraw from 'maplibre-gl-draw';

@Component({
  selector: 'app-map',
  imports: [MapComponent],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class Map implements OnInit {
  constructor() {
    effect(() => {
      const polygon = this.polygon();
      if (!polygon) return;
      this.drawPolygon(polygon);
    });
  }

  ngOnInit(): void {
    this.style = {
      version: 8,
      sources: {
        osm: {
          type: 'raster',
          tiles: ['https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'],
          tileSize: 256,
          attribution: '© OpenStreetMap contributors',
        },
      },
      layers: [
        {
          id: 'osm-layer',
          type: 'raster',
          source: 'osm',
        },
      ],
    };
  }

  protected style!: StyleSpecification;
  private draw!: MapLibreDraw;

  polygon = input<Position[][]>();

  polygonChangedAction = output<Position[][]>();

  center = signal<[number, number]>([17.908950535135272, 47.088969173638375]);

  onMapLoad(map: MapLibreMap) {
    this.draw = new MapLibreDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
    });

    map.addControl(this.draw as unknown as IControl);

    map.on('draw.create', (e) => this.onDrawEvent(e));
    map.on('draw.update', (e) => this.onDrawEvent(e));
    map.on('draw.delete', (e) => this.onDrawEvent(e));
  }

  onDrawEvent(e: { features: Feature<Polygon>[]; type: string }) {
    if (e.type === 'draw.delete') {
      this.polygonChangedAction.emit([]);
      return;
    }
    if (e.features && e.features.length > 0) {
      const polygon: Feature<Polygon> = e.features[0];
      this.polygonChangedAction.emit(polygon.geometry.coordinates);
    }
  }

  drawPolygon(polygon: Position[][]) {
    if (polygon && polygon.length > 0) {
      const feature: Feature = {
        geometry: {
          coordinates: polygon,
          type: 'Polygon',
        },
        properties: {},
        type: 'Feature',
      };
      this.draw.add(feature);
      this.calculateCurrentPosition(polygon);
    }
  }

  calculateCurrentPosition(polygon: Position[][]) {
    const coordinates = polygon
      .flatMap((coords) => coords)
      .map(([lng, lat]) => [parseFloat(lng.toString()), parseFloat(lat.toString())]);

    let minLng = 0;
    let maxLng = 99999;
    let minLat = 0;
    let maxLat = 99999;

    coordinates.forEach(([lng, lat]) => {
      if (lng > minLng) minLng = lng;
      if (lng < maxLng) maxLng = lng;
      if (lat > minLat) minLat = lat;
      if (lat < maxLat) maxLat = lat;
    });

    const center: [number, number] = [
      minLng + (maxLng - minLng) / 2,
      minLat + (maxLat - minLat) / 2,
    ];
    this.center.set(center);
  }
}
