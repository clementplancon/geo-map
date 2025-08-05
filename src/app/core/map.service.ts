import maplibregl, { Map } from 'maplibre-gl';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MapService {
  map!: Map;

  setMap(map: Map) {
    this.map = map;
  }

  /**
   * Convertit des coordonnées géographiques en position X en % de la largeur de la map.
   */
  projectToPercentX(lng: number, lat: number): number {
    if (!this.map) return 0;
    const { x } = this.map.project([lng, lat]);
    const width = this.map.getContainer().clientWidth;
    return (x / width) * 100;
  }

  /**
   * Convertit des coordonnées géographiques en position Y en % de la hauteur de la map.
   */
  projectToPercentY(lng: number, lat: number): number {
    if (!this.map) return 0;
    const { y } = this.map.project([lng, lat]);
    const height = this.map.getContainer().clientHeight;
    return (y / height) * 100;
  }
}
