export namespace Search {
    export enum RealEstateAttributeType {
        RealStateAgency = 'real_state_agency',
        Bedrooms = 'bedrooms',
        CoveredArea = 'covered_area',
        Bathrooms = 'bathrooms',
    }

    export enum Source {
        Mercadolibre = 'Mercado Libre',
    }

    interface IntegrationSearch {
        getFilters(): Record<string, string>;

        search(): object[];

        addFilter(filter: RealEstateAttributeType, value: string): void;

        removeFilter(filter: RealEstateAttributeType): void;
    }

    export class SearchResult {
    }
}
