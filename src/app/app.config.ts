import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { MapService } from './core/map.service';
import { EarthquakeService } from './core/earthquake.service';
import { CitiesService } from './core/cities.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(),
    MapService,
    EarthquakeService,
    CitiesService
  ]
};
