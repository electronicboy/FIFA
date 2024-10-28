import React from 'react';
import {db} from "@/util/db";
import SearchComponentBox from "@/components/SearchComponentBox";
import {mapToNumeric} from "@/util/ArrayUtils";
import BusinessEntryList from "@/components/BusinessEntryList";

export default async function Page({searchParams}: {
    searchParams: Promise<{
        query?: string | null,
        category?: string | null,
        location?: string | null,
        page?: string | null
    }>
}) {
    const resolvedSearch = await searchParams;
    try {
        const categoryIds = resolvedSearch.category != null ? mapToNumeric(resolvedSearch.category.split(',')) : null;
        const locationIds = resolvedSearch.location != null ? mapToNumeric(resolvedSearch.location.split(',')) : null;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const pageNum = resolvedSearch.page != null && !isNaN(Number(resolvedSearch.page)) ? Number(resolvedSearch.page) : 1;

        console.log(resolvedSearch);
        let hasInjectedWhere = false;
        const queryParams = [];
        /* language=PostgreSQL */
        let sql = `SELECT business.id, name, location, website, phone, logo, image_thumb, image_large, business_id, longitude, latitude, street_address, zipcode, hours, location, city as city_id
                   FROM biz_businesses business
                            INNER JOIN biz_locations ON business.city = biz_locations.id`;

        if (categoryIds != null) {
            sql += `RIGHT JOIN public.biz_business_category bbc on business.id = bbc.business WHERE bbc.category = ANY($1::int[])`;
            queryParams.push(categoryIds);
            hasInjectedWhere = true;
        }

        if (locationIds != null) {
            if (hasInjectedWhere) {
                sql += ` AND city = ANY($2::int[])`;
            } else {
                sql += ` WHERE city = ANY($1::int[])`;
            }
            queryParams.push(locationIds);
        }
        console.log(sql);
        console.log(queryParams);

        const searchRes = await db().query(sql, queryParams);

        const locations = await db().query<{
            id: number,
            location_name: string,
            country: string
        }>("SELECT id, location_name, country FROM biz_locations");
        const categories = await db().query<{ id: number, name: string }>("SELECT id, name FROM biz_category");


        const results = searchRes.rows.slice(0, 10)
        console.log(searchRes.rows);


        return (
            <div>
                <div className={"flex flex-row"}>
                    <div><SearchComponentBox locations={locations.rows} categories={categories.rows}/></div>
                    <div><BusinessEntryList entries={results} /></div>
                </div>
            </div>
        );
    } catch (error) {
        console.error(error);
    }
}
