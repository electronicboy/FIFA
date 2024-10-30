import { Pool } from "pg";

let pool: Pool | null;

export function db(): Pool {
    if (pool == null) {
        pool = new Pool({
            connectionString: process.env.DATABASE_URL,
        });
    }

    return pool!;
}

export type Business = {
    id: number;
    name: string;
    /** full address */
    location?: string;
    website?: string;
    phone?: string;
    logo?: string;
    image_thumb?: string;
    image_large?: string;
    longitude: number;
    latitude: number;
    street_address?: string;
    zipcode?: string;
    city?: number;
    hours?: Hours;
};

export type Hours = {
    Monday?: Array<string>;
    Tuesday?: Array<string>;
    Wednesday?: Array<string>;
    Thursday?: Array<string>;
    Friday?: Array<string>;
    Saturday?: Array<string>;
    Sunday?: Array<string>;
};

export type Category = {
    name: string;
    //thumbnail?: string,
    //banner?: string
};

export type Location = {
    location_name: string;
    country: string;
};

export type Review = {
    business: number;
    userId: number;
    comment: string;
    review: number;
};

export type User = {
    name: string;
    clerk: string;
};
