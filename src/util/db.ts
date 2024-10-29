import  {Pool} from "pg";

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
    name: string,
    // TODO: add these?
    thumbnail?: string,
    banner?: string
}

// TODO: Refactor this type
export type Location = {
    location_name: string,
    country: string,
}

export type Review = {
    business: number,
    userId: number,
    comment: string,
    review: number
}
