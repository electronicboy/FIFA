import React from 'react';
import {db} from "@/util/db";
import SearchComponentBox from "@/components/SearchComponentBox";
import {mapToNumeric} from "@/util/ArrayUtils";
import BusinessEntryList from "@/components/BusinessEntryList";
import PaginationComponent from "@/components/PaginationComponent";

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
        const categoryIds = resolvedSearch.category != null && resolvedSearch.category.length > 0 ? mapToNumeric(resolvedSearch.category.split(',')) : null;
        const locationIds = resolvedSearch.location != null && resolvedSearch.location.length > 0 ? mapToNumeric(resolvedSearch.location.split(',')) : null;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const pageNum = resolvedSearch.page != null && !isNaN(Number(resolvedSearch.page)) ? Number(resolvedSearch.page) : 1;

        let hasInjectedWhere = false;
        const queryParams = [];
        /* language=PostgreSQL */
        let sql = `SELECT business.id,
                          name,
                          location,
                          website,
                          phone,
                          logo,
                          image_thumb,
                          image_large,
                          business_id,
                          longitude,
                          latitude,
                          street_address,
                          zipcode,
                          hours,
                          location,
                          city as city_id
                   FROM biz_businesses business
                            INNER JOIN biz_locations ON business.city = biz_locations.id`;

        if (categoryIds != null) {
            sql += ` RIGHT JOIN public.biz_business_category bbc on business.id = bbc.business WHERE bbc.category = ANY($1::int[])`;
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

        if (resolvedSearch.query != null) {
            if (!hasInjectedWhere) {
                sql += ` WHERE `;
            }

            sql += `name LIKE $${queryParams.length + 1}`;
            queryParams.push(`%${resolvedSearch.query}%`);
        }

        const searchRes = await db().query(sql, queryParams);

        const locations = await db().query<{
            id: number,
            location_name: string,
            country: string
        }>("SELECT id, location_name, country FROM biz_locations");
        const categories = await db().query<{ id: number, name: string }>("SELECT id, name FROM biz_category");


        const startPos = (pageNum - 1) * 10;
        const results = searchRes.rows.slice(startPos, startPos + 10);


        return (
            <div>
                <div className={"flex flex-row"}>
                    <div><SearchComponentBox locations={locations.rows} categories={categories.rows}/></div>
                    <div>
                        <BusinessEntryList entries={results}/>
                        <PaginationComponent itemCount={searchRes.rows.length} itemsPerPage={10}/>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error(error);
        throw error; // Rethrow so it can be caught by the error page
    }
}
