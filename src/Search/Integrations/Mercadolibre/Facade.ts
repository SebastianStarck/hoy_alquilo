import {Geo} from '@/Geo';
import {MercadolibreSearch} from '@/Search/Integrations/Mercadolibre/Mercadolibre';

export namespace Mercadolibre {
    export class Facade {
        public static newSearch(region: Geo.Region, filters?: Record<string, string>) {
            const lat = region.borders.south + '_' + region.borders.north;
            const lon = region.borders.west + '_' + region.borders.east;

            return new MercadolibreSearch({lat, lon}, filters);
        }
    }
}
