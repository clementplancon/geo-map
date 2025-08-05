import { Component } from '@angular/core';
import { CitiesService } from '../../../core/cities.service';
import { MapService } from '../../../core/map.service';
import { City } from '../../../core/models/city.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-city-labels',
  imports: [CommonModule],
  templateUrl: './city-labels.component.html',
  styleUrl: './city-labels.component.scss'
})
export class CityLabelsComponent {

  cities$: Observable<City[]>;

  constructor(
    private citiesService: CitiesService,
    private mapService: MapService) {
    this.cities$ = this.citiesService.visibleCities$;
  }

    getX(city: City) { return this.mapService.projectToPercentX(city.lng, city.lat); }
    getY(city: City) { return this.mapService.projectToPercentY(city.lng, city.lat); }
}
