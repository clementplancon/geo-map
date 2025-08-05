import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import maplibregl, { Map, StyleSpecification } from 'maplibre-gl';
import { CitiesService } from '../../../core/cities.service';
import { MapService } from '../../../core/map.service';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef<HTMLDivElement>;
  map!: Map;

  constructor(
    private citiesService: CitiesService,
    private mapService: MapService
  ) {}

  ngAfterViewInit() {
    this.map = new maplibregl.Map({
      container: this.mapContainer.nativeElement,
      style: this.getMapStyle(), // Blueprint-like style (voir ci-dessous)
      center: [0, 20], // Longitude, latitude
      zoom: 2,
      minZoom: 1,
      maxZoom: 12,
      attributionControl: false
    });

    this.mapService.setMap(this.map);

    const updateCitiesOverlay = () => {
      const b = this.map.getBounds();
      this.citiesService.setBBox([b.getWest(), b.getSouth(), b.getEast(), b.getNorth()]);
      this.citiesService.setZoom(this.map.getZoom());
    };

    // this.map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
    this.map.on('move', updateCitiesOverlay);
    this.map.on('zoom', updateCitiesOverlay);
    this.map.on('resize', updateCitiesOverlay);

  }

  getMapStyle(): StyleSpecification {
    return {
      version: 8 as 8,
      sources: {
        maplibre: {
          url: 'https://demotiles.maplibre.org/tiles/tiles.json',
          type: 'vector'
        }
      },
      layers: [
        // Fond noir
        {
          id: 'background',
          type: 'background',
          paint: { 'background-color': '#222' }
        },
        // Pays remplis (optionnel)
        // {
        //   id: 'countries-fill',
        //   type: 'fill',
        //   source: 'maplibre',
        //   'source-layer': 'countries',
        //   paint: { 'fill-color': '#111', 'fill-opacity': 0.2 }
        // },
        // Frontières pays (traits blancs)
        {
          id: 'countries-outline',
          type: 'line',
          source: 'maplibre',
          'source-layer': 'countries', // <-- c'est bien 'countries'
          paint: {
            'line-color': '#fff',
            'line-width': 1
          }
        }
      ]
    };
  }
}
