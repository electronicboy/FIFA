import React from 'react';

export default async function Page({searchParams}: {searchParams: Promise<{query?: string|null, category?: string|null, location?: string|null}>}) {
    const resolvedSearch = await searchParams;
    const categoryId = resolvedSearch.category != null && !isNaN(Number(resolvedSearch.category)) ? Number(resolvedSearch.category) : null;
    const locationId = resolvedSearch.location != null && !isNaN(Number(resolvedSearch.location)) ? Number(resolvedSearch.location) : null;

    let hasInjectedWhere = false;
    const queryParams = []
    /* language=PostgreSQL */
    let sql =  `SELECT name, image_thumb, image_large, location, city FROM biz_businesses business INNER JOIN biz_locations ON business.city = biz_locations.id`
    if (categoryId != null) {
        sql +=  `RIGHT JOIN public.biz_business_category bbc on business.id = bbc.business WHERE bbc.category = ?`
        queryParams.push(categoryId);
        hasInjectedWhere = true;
    }

    if (locationId != null) {
        if (hasInjectedWhere) {
            sql += ` AND location = ?`
        } else {
            sql += ` WHERE location = ?`
        }
        queryParams.push(locationId)
    }

    console.log(sql, queryParams);

    return (
        <div>Page</div>
    );
}
