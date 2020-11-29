import {Search} from '@/Search/Search';
import axios from 'axios';
import {mercadolibreFilters} from '@/Search/Integrations/Mercadolibre/Filters';
import {MercadolibreApiException} from "@/Search/Integrations/Mercadolibre/Exceptions";
import {Geo} from "@/Geo";
import {MercadolibreTypes} from "@/Search/Integrations/Mercadolibre/Types";
import {SearchTypes} from "@/Search/Types";

export class MercadolibreSearch {
    private filters: Record<string, string>;
    private location: Geo.Region;

    constructor(parameters: { location: Geo.Region, filters?: Record<string, string> }) {
        this.filters = parameters.filters || {};
        this.location = parameters.location;

        return this;
    }

    public async all() {
        let response = await axios
            .request({url: this.computeSearchUrl(), })
            .catch(e => { throw new MercadolibreApiException(e)});

        let currentOffset: number = 0;
        const resultsByPage: number = 50;
        let data: MercadolibreTypes.RealEstatePublication[];

        data = [...response.data.results];

        while (currentOffset <= response.data.paging.total - resultsByPage && currentOffset < 950) {
            currentOffset += 50;
            response = await axios.get(this.computeSearchUrl(currentOffset));

            data = [...data, ...response.data.results];
        }

        return this.digestDataCollection(data);
    }

    public digestDataCollection(data: MercadolibreTypes.RealEstatePublication[]): object[] {
        const result: object[] = [];

        data.forEach((entry) => {
            const mappedEntry = this.mapPublication(entry);
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

    mapPublication(realEstatePublication: MercadolibreTypes.RealEstatePublication): SearchTypes.RealEstatePublication {
        return {
            title: realEstatePublication.title,
            price: realEstatePublication.price,
            source: Search.Source.Mercadolibre,
            link: realEstatePublication.permalink,
            thumbnail: realEstatePublication.thumbnail,
            location: {
                address: this.parseAddress(realEstatePublication.location),
                lat: realEstatePublication.location.lat,
                lon: realEstatePublication.location.lon,
            },
            attributes: [],
        };
    }

    parseAddress(location: MercadolibreTypes.Location): string {
        const neighborhood = location.neighborhood.name;
        const city = location.city.name;
        const addressLine = location.address_line;

        return neighborhood ? `${addressLine}, ${neighborhood}, ${city}` : `${addressLine}, ${city}`;
    }

    computeSearchUrl(offset?: number): string {
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

    getFilters(): Record<string, string> {
        return this.filters;
    }

    getFilterValue(filter: string) {
        return this.filters[filter];
    }

    stringifyFilter(filter: string, value: string) {
        return '&' + mercadolibreFilters[filter].id + '=' + mercadolibreFilters[filter].values[value];
    }

    getUrlBaseFilters(): string {
        return '&category=MLA1459&9991459-AMLA_1459_2=9991459-AMLA_1459_2-MMLA12620';
    }

    getLocation(): string | void {
        const lat = this.location.borders.south + '_' + this.location.borders.north;
        const lon = this.location.borders.west + '_' + this.location.borders.east;

        return 'item_location=lat:' + lat + ',lon:' + lon;
    }
}
