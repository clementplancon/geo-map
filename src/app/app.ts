import { Component } from '@angular/core';
import { MapComponent } from './features/map/map/map.component';
import { EarthquakeMapOverlayComponent } from './features/earthquakes/earthquake-map-overlay/earthquake-map-overlay.component';
import { CityLabelsComponent } from './features/cities/city-labels/city-labels.component';

@Component({
  selector: 'app-root',
  imports: [
    MapComponent,
    EarthquakeMapOverlayComponent,
    CityLabelsComponent, 
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'geo-map';
}
