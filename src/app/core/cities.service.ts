import { Injectable } from '@angular/core';
import { City } from './models/city.model';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  private allCities: City[] = [];
  private bbox$ = new BehaviorSubject<[number, number, number, number] | null>(null); // [west, south, east, north]
  private zoomLevel$ = new BehaviorSubject<number>(2);

  constructor(private http: HttpClient) {
    this.http.get<City[]>('worldcities.json').subscribe(cities => {
      // Normalise id en string, filtre les villes sans lat/lng, etc.
      this.allCities = cities
        .filter(c => typeof c.lat === 'number' && typeof c.lng === 'number');
    });
  }

  setBBox(bbox: [number, number, number, number]) { this.bbox$.next(bbox); }
  setZoom(zoom: number) { this.zoomLevel$.next(zoom); }

  readonly visibleCities$ = combineLatest([this.bbox$, this.zoomLevel$]).pipe(
    map(([bbox, zoom]) => {
      if (!bbox) return [];
      const [west, south, east, north] = bbox;

      // Filtrage spatial (dans la bbox visible)
      const visible = this.allCities.filter(city =>
        city.lng >= west && city.lng <= east &&
        city.lat >= south && city.lat <= north
      );

      // Pour chaque pays, appliquer la logique métier
      const byCountry: Record<string, City[]> = {};
      for (const city of visible) {
        if (!byCountry[city.iso2]) byCountry[city.iso2] = [];
        byCountry[city.iso2].push(city);
      }

      const display: City[] = [];
      for (const iso2 of Object.keys(byCountry)) {
        const citiesInCountry = byCountry[iso2]
          .filter(c => typeof c.population === 'number')
          .sort((a, b) => (b.population ?? 0) - (a.population ?? 0));
        const bigCities = citiesInCountry.filter(c => (c.population ?? 0) >= 200_000);

        if (bigCities.length > 0) {
          display.push(...bigCities.slice(0, 5));
        } else {
          // Cherche la capitale primaire si elle existe, sinon la plus peuplée
          const capital = citiesInCountry.find(c => c.capital === 'primary')
            ?? citiesInCountry[0];
          if (capital) display.push(capital);
        }
      }

      // Logique d’affichage selon le zoom
      // <5 : rien, 5-7 : seulement capitales, 7+ : toutes (ou adapte à ton besoin)
      if (zoom < 3) return [];
      if (zoom < 5) return display.filter(c => c.capital === 'primary');
      return display;
    })
  );
}
