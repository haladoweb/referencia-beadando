import { Component, input, OnInit, output } from '@angular/core';
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

  onMapLoad(map: MapLibreMap) {
    this.draw = new MapLibreDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
    });

    map.addControl(this.draw as unknown as IControl);

    const initialPolygon = this.polygon();
    if (initialPolygon && initialPolygon.length > 0) {
      const feature: Feature = {
        geometry: {
          coordinates: initialPolygon,
          type: 'Polygon',
        },
        properties: {},
        type: 'Feature',
      };
      this.draw.add(feature);
    }

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
}
