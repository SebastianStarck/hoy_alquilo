import {Search} from '@/Search/Search';
import axios from 'axios';
import {mercadolibreFilters} from '@/Search/Integrations/Mercadolibre/Filters';

// TODO: Add interface for API response
export class MercadolibreSearch {
    private filters: Record<string, string>;
    private location: IMercadolibreLocation;

    constructor(location: IMercadolibreLocation, filters?: Record<string, string>) {
        this.filters = filters || {};
        this.location = location;

        return this;
    }

    public async all() {
        let response = await axios.get(this.computeSearchUrl());
        let currentOffset: number = 0;
        const resultsByPage: number = 50;
        let data: object[];

        if (response.status !== 200) {
            // handle error
        }

        data = [...response.data.results];

        while (currentOffset <= response.data.paging.total - resultsByPage && currentOffset < 950) {
            currentOffset += 50;
            response = await axios.get(this.computeSearchUrl(currentOffset));

            data = [...data, ...response.data.results];
        }

        return this.digestDataCollection(data);
    }

    public digestDataCollection(data): object[] {
        const result: object[] = [];

        data.forEach((entry) => {
            const mappedEntry = this.mapEntry(entry);
            result.push(mappedEntry);
        });

        return result;
    }

    public addFilter(filter: Search.RealEstateAttributeType, value: string): void {
        if (!this.filterIsSet(filter)) {
            this.filters[filter] = value;
        }
    }

    public removeFilter(filter: Search.RealEstateAttributeType): void {
        if (!this.filterIsSet(filter)) {
            delete this.filters[filter];
        }
    }

    public filterIsSet(filter: Search.RealEstateAttributeType | string): boolean {
        return !!this.filters[filter];
    }

    private mapEntry(entry) {
        return {
            title: entry.title,
            price: entry.price,
            link: entry.permalink,
            thumbnail: entry.thumbnail,
            location: {
                address: this.parseAddress(entry.location),
                lat: entry.location.lat,
                lon: entry.location.lon,
            },
            attributes: {
                // add attributes
            },
        };
    }

    private parseAddress(location): string {
        const neighborhood = location.neighborhood.name;
        const city = location.city.name;
        const addressLine = location.address_line;

        return neighborhood ? `${addressLine}, ${neighborhood}, ${city}` : `${addressLine}, ${city}`;
    }

    private computeSearchUrl(offset?: number): string {
        let url = 'https://api.mercadolibre.com/sites/MLA/search?'
            + this.getLocation() + 'category=MLA1459' + this.getUrlBaseFilters();

        Object.keys(this.filters).forEach((filter) => {
            if (this.filterIsSet(filter)) {
                url += this.stringifyFilter(filter, this.filters[filter]);
            }
        });

        if (offset) {
            url += '&offset=' + offset;
        }

        return url;
    }

    private getFilters(): Record<string, string> {
        return this.filters;
    }

    private getFilterValue(filter: string) {
        return this.filters[filter];
    }

    private stringifyFilter(filter: string, value: string) {
        return '&' + mercadolibreFilters[filter].id + '=' + mercadolibreFilters[filter].values[value];
    }

    private getUrlBaseFilters(): string {
        return '&category=MLA1459&9991459-AMLA_1459_2=9991459-AMLA_1459_2-MMLA12620';
    }

    private getLocation(): string | void {
        if (this.location.lat && this.location.lon) {
            return 'item_location=lat:' + this.location.lat + ',lon:' + this.location.lon;
        }
    }
}

interface IMercadolibreLocation {
    lat: string;
    lon: string;
}
