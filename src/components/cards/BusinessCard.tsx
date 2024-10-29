import React from "react";
import {
    Button,
    CardHeader,
    CardFooter,
    Box,
    Card,
    Flex,
    AspectRatio,
    Text,
    Link,
    Stack,
    Image,
} from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { Business } from "@/util/db";
import NextImage from "next/image";
import StoreFront from "@/../public/StoreFront.webp";

export default function BusinessCard({ business }: { business: Business }) {
    const {
        id,
        name,
        location,
        website,
        phone,
        logo,
        image_thumb,
        image_large,
        longitude,
        latitude,
        street_address,
        zipcode,
        city,
        hours,
    } = business;

    const img =
        business.image_large != null
            ? business.image_large
            : business.image_thumb != null
            ? business.image_thumb
            : business.logo != null
            ? business.logo
            : StoreFront;

    const isLogo =
        business.logo != null ? <img src={logo} alt={name} /> : <img src="/iconlogo.png" alt="Replacement Icon" />;

    return (
        <Card.Root maxW="xl" overflow="hidden" m={10}>
            <NextImage src={img} alt="" width={573} height={413} />
            <CardHeader className="flex flex-row items-center gap-2">
                <div className="size-10 rounded-md">{isLogo}</div>
                <div>{name}</div>
            </CardHeader>
            <Card.Body gap="2">
                <Card.Title>{website}</Card.Title>
                <Card.Description>Opening Hours: hours</Card.Description>
                <Text textStyle="md" fontWeight="light" letterSpacing="tight" mt="2">
                    {phone}
                </Text>
                <Text textStyle="md" fontWeight="light" letterSpacing="tight" mt="2">
                    {location}
                </Text>
                <Text textStyle="md" fontWeight="light" letterSpacing="tight" mt="2">
                    {street_address}
                </Text>
                <Text textStyle="md" fontWeight="light" letterSpacing="tight" mt="2">
                    {zipcode}
                </Text>
                <Text textStyle="md" fontWeight="light" letterSpacing="tight" mt="2">
                    {city}
                </Text>
            </Card.Body>
            <Card.Footer gap="2">
                <Button variant="subtle" colorPalette="blue" flex="1">
                    Like
                </Button>
                <Button variant="ghost" colorPalette="pink" flex="1">
                    Review
                </Button>
                <Button className="bg-red-500" variant="solid" colorPalette="yellow" flex="1">
                    Delete
                </Button>
            </Card.Footer>
        </Card.Root>
    );
}
