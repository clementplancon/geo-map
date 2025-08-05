export interface City {
    id: string;                // l’id unique (string ou number selon ton import)
    city: string;              // nom Unicode (utiliser pour affichage)
    city_ascii: string;        // nom ASCII (optionnel, peut servir pour recherche)
    lat: number;
    lng: number;
    country: string;           // nom complet du pays
    iso2: string;              // code pays (2 lettres)
    iso3: string;              // code pays (3 lettres)
    admin_name: string;        // région/état/province
    capital: '' | 'primary' | 'admin' | 'minor';
    population?: number;       // certains n’ont pas de pop (undefined)
  }
  