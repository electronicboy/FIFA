import {Business, City} from "@/util/db";
import {Box, Card, CardRoot} from "@chakra-ui/react";
import Image from "next/image";
import StoreFront from '@/../public/StoreFront.webp';


export default function BusinessEntry({business}: { business: Business & City }) {

    const img = business.image_large != null ? business.image_large : (business.image_thumb != null ? business.image_thumb : (business.logo != null ? business.logo : StoreFront));
    return (<>

            <CardRoot flexDirection={"row"} marginBottom={1}>
                <Image
                    width={128}
                    height={128}
                    src={img}
                    alt={business.name}
                />
                <Box ml={2}>
                    <Card.Title mb={2}>{business.name}</Card.Title>
                    <Card.Body>
                        <Card.Description>{business.street_address}</Card.Description>
                    </Card.Body>
                    <Card.Footer>{business.location}</Card.Footer>
                </Box>
            </CardRoot>
        </>
    );
}
