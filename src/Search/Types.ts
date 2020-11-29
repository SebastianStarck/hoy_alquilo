import {Search} from "@/Search/Search";

export module SearchTypes {
    export interface RealEstateAttribute {
        id: string;
        values: Record<string, string>;
    }

    export interface RealEstatePublication {
        title: string;
        price?: number;
        source: Search.Source;
        link: string;
        thumbnail: string;
        location: Location;
        attributes: Attribute[];
    }

    interface Attribute {

    }

    interface Location {
        address: string;
        lat: number;
        lon: number;
    }
}
