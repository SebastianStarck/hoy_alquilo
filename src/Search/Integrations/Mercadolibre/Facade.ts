import {Geo} from '@/Geo';
import {MercadolibreSearch} from "@/Search/Integrations/Mercadolibre/Search";

export namespace Mercadolibre {
    export class Facade {
        public static newSearch(region: Geo.Region, filters?: Record<string, string>) {
            return new MercadolibreSearch({location: region, filters: filters});
        }
    }
}
