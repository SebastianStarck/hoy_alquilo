import {Search} from '@/Search/Search';

export const mercadolibreFilters: Record<string, Search.IRealEstateAttribute> = {
    real_estate_agency: {
        id: 'real_estate_agency',
        values: {
            yes: 'yes',
        },
    },

    bedrooms: {
        id: 'BEDROOMS',
        values: {
            studio: '0-0',
            1: '1-1',
            2: '2-2',
            3: '3-3',
            4: '4-4',
            5: '5-*',
        },
    },

    bathrooms: {
        id: 'FULL_BATHROOMS',
        values: {
            1: '1-1',
            2: '2-2',
            3: '3-3',
            4: '4-*',
        },
    },
};
