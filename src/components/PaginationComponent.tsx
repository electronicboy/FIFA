'use client'
import {HStack} from "@chakra-ui/react";
import {
    PaginationItems,
    PaginationNextTrigger,
    PaginationPrevTrigger,
    PaginationRoot
} from "@/components/ui/pagination";
import React from "react";
import {PageChangeDetails} from "@zag-js/pagination";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

export default function PaginationComponent({itemCount, itemsPerPage}: { itemCount: number, itemsPerPage: number }) {
    const router = useRouter();
    const path = usePathname();
    const currentQuery = useSearchParams();

    function handlePageChange(details: PageChangeDetails) {
        const searchParams = new URLSearchParams()
        currentQuery.entries().forEach((item) => {
            searchParams.set(item[0], item[1])
        })
        searchParams.set("page", details.page.toString())

        router.push(`${path}?${searchParams.toString()}`);
    }

    return (
        <PaginationRoot count={itemCount} pageSize={itemsPerPage} defaultPage={1} onPageChange={handlePageChange}>
            <HStack>
                <PaginationPrevTrigger/>
                <PaginationItems/>
                <PaginationNextTrigger/>
            </HStack>
        </PaginationRoot>
    );
}
