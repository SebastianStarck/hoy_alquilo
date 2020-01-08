export namespace Search {
    export enum RealEstateAttributeType {
        RealStateAgency = 'real_state_agency',
        Bedrooms = 'bedrooms',
        CoveredArea = 'covered_area',
        Bathrooms = 'bathrooms',
    }

    export interface IRealEstateAttribute {
        id: string;
        values: Record<string, string>;
    }

    interface IIntegrationSearch {
        getFilters(): Record<string, string>;

        search(): object[];

        addFilter(filter: RealEstateAttributeType, value: string): void;

        removeFilter(filter: RealEstateAttributeType): void;
    }

    export class SearchResult {
    }
}
