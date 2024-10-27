import  {Pool} from "pg";
import {number, string} from "prop-types";

let pool: Pool|null;

export function db(): Pool {
    if (pool == null) {
        pool = new Pool({
            connectionString: process.env.DATABASE_URL,
        })
    }

    return pool!;
}

export type Business = {
    id: number,
    name: string,
    /** full address */
    location?: string,
    website?: string,
    phone?: string,
    logo?: string,
    image_thumb?: string,
    image_large?: string,
    longitude: number,
    latitude: number,
    street_address?: string,
    zipcode?: string,
    city?: number
    /** This is JSON encoded inside the DB, not sure how this is handled here */
    hours?: string
}

export type Category = {
    id: number,
    name: string,
    // TODO: add these?
    thumbnail?: string,
    banner?: string
}

// TODO: Refactor this type
export type City = {
    id: number,
    name: string,
    country: string,
}

export type Review = {
    id: number,
    business: number,
    user: number,
    comment: string,
    review: number
}
