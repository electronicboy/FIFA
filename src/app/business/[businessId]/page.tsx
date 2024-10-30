import React from "react";
import { SimpleGrid, Container } from "@chakra-ui/react";
import BusinessCard from "@/components/cards/BusinessCard";
import { Business, db } from "@/util/db";

export default async function businessPage() {
    const database = db();

    const biz_businesses = await database.query<Business>(`
    SELECT
        biz_businesses.id,
        biz_businesses.name,
        biz_businesses.location,
        biz_businesses.website,
        biz_businesses.phone,
        biz_businesses.logo,
        biz_businesses.image_thumb,
        biz_businesses.image_large,
        biz_businesses.longitude,
        biz_businesses.latitude,
        biz_businesses.street_address,
        biz_businesses.zipcode,
        biz_businesses.city,
        biz_businesses.hours
    FROM biz_businesses
    `);

    const cardInfo = biz_businesses.rows;

    return (
        <Container maxW="80rem" centerContent>
            <SimpleGrid className="gap-4 min-w-6">
                {cardInfo.map((data) => {
                    return <BusinessCard key={data.id} business={data} />;
                })}
            </SimpleGrid>
        </Container>
    );
}
