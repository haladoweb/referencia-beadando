import { Component, effect, input, OnInit, output, signal } from '@angular/core';
import { MapComponent } from '@maplibre/ngx-maplibre-gl';
import { Feature, Polygon, Position } from 'geojson';
import { StyleSpecification, Map as MapLibreMap, IControl, LngLatBounds, Popup } from 'maplibre-gl';
import MapLibreDraw from 'maplibre-gl-draw';
import { PolygonOptions } from '../../model/polygon.model';
import { centroid } from '@turf/turf';

@Component({
  selector: 'app-map',
  imports: [MapComponent],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class Map implements OnInit {
  constructor() {
    effect(() => {
      if (this.readonly()) return;

      const polygons = this.polygons();
      if (polygons.length === 0 || !this.draw) return;
      this.drawPolygons(polygons);
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
  protected map!: MapLibreMap;

  polygons = input<PolygonOptions[]>([]);
  readonly = input(false);

  polygonChangedAction = output<Position[][]>();

  center = signal<[number, number]>([17.908950535135272, 47.088969173638375]);

  onMapLoad(map: MapLibreMap) {
    this.map = map;

    if (!this.readonly()) {
      this.addDraw(map);
    } else {
      this.addBuildingsLayer();
    }
  }

  addDraw(map: MapLibreMap) {
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
    if (this.readonly()) return;

    if (e.type === 'draw.delete') {
      this.polygonChangedAction.emit([]);
      return;
    }
    if (e.features && e.features.length > 0) {
      const polygon: Feature<Polygon> = e.features[0];
      this.polygonChangedAction.emit(polygon.geometry.coordinates);
    }
  }

  drawPolygons(polygons: PolygonOptions[]) {
    polygons.forEach((polygon) => {
      if (polygon && polygon.coordinates.length > 0) {
        const feature: Feature = {
          geometry: {
            coordinates: polygon.coordinates,
            type: 'Polygon',
          },
          properties: { color: polygon.color },
          type: 'Feature',
        };
        const id = this.draw.add(feature);
        if (this.readonly()) {
          this.draw.setFeatureProperty(id[0], 'user_no_edit', true);
        }
      }
    });
    this.calculateCurrentPosition();
  }
  addBuildingsLayer() {
    if (!this.map || this.polygons().length === 0) return;

    this.map.addSource('buildings', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: this.polygons().map((polygon) => ({
          geometry: {
            coordinates: polygon.coordinates,
            type: 'Polygon',
          },
          properties: {
            popUpTitle: polygon.popUpTitle,
            popUpContent: polygon.popUpContent,
            color: polygon.color,
          },
          type: 'Feature',
        })),
      },
    });

    this.map.addLayer({
      id: 'buildings',
      source: 'buildings',
      type: 'fill',
      paint: {
        'fill-color': ['coalesce', ['get', 'color'], '#ff0000'],
        'fill-opacity': 0.5,
      },
    });
    this.map.addLayer({
      id: 'buildings-outline',
      source: 'buildings',
      type: 'line',
      paint: {
        'line-color': ['coalesce', ['get', 'color'], '#ff0000'],
        'line-width': 2,
        'line-opacity': 1,
      },
    });

    const popup = new Popup({
      closeButton: false,
      closeOnClick: false,
      className: 'popup',
    });

    this.map.on('mouseenter', ['buildings', 'buildings-outline'], (e) => {
      this.map.getCanvas().style.cursor = 'pointer';

      if (!e.features || !e) return;
      const feature = e.features[0] as Feature<Polygon>;

      if (!feature.properties) return;
      const center = centroid(feature).geometry.coordinates as [number, number];
      const title = feature.properties['popUpTitle'];
      const content = feature.properties['popUpContent'];

      popup
        .setLngLat(center)
        .setHTML(
          `<div class="bg-base-200 text-primary-content p-5"><strong class="text-xl">${title}</strong><br>${content}</div>`
        )
        .addTo(this.map);
    });

    this.map.on('mouseleave', ['buildings', 'buildings-outline'], (e) => {
      this.map.getCanvas().style.cursor = '';
      popup.remove();
    });

    this.calculateCurrentPosition();
  }

  calculateCurrentPosition() {
    const coordinates = this.polygons()
      .flatMap((polygon) => polygon.coordinates)
      .flatMap((ring) => ring);
    if (coordinates.length === 0) return;
    const bounds = new LngLatBounds();
    coordinates.forEach((coord) => bounds.extend([coord[0], coord[1]]));
    this.map.fitBounds(bounds, { padding: 250 });
  }
}
