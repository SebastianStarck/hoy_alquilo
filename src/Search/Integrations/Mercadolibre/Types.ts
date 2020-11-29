export module MercadolibreTypes {
    export interface ApiResponse {
        status: number;
        paging: Paging;
        results: RealEstatePublication[];
    }

    export interface Paging {
        total: number;
        offset: number;
        limit: number;
    }

    export interface Publisher {
        id: number;
        permalink: string;
        real_estate_agency: boolean;
    }

    export interface Attribute {

    }

    export interface RealEstatePublication {
        title: string;
        seller: Publisher;
        price?: number;
        condition: string;
        permalink: string;
        thumbnail: string;
        location: Location;
        attributes: Attribute[];
    }

    export interface Location {
        address_line: string;
        neighborhood: GeoEntity;
        city: GeoEntity;
        state: GeoEntity;
        lat: number;
        lon: number;
    }

    export interface GeoEntity {
        "name": string;
    }

    export interface RealEstateAttribute {
        id: string;
        values: Record<string, string>;
    }
}