import {Business, Location} from "@/util/db";
import BusinessEntry from "@/components/cards/BusinessEntry";

export default function BusinessEntryList({entries}: { entries: (Business & Location)[] }) {
    return (
        <>
            {entries.map(business => (
                <BusinessEntry key={business.id} business={business}/>
            ))}
        </>);
}

