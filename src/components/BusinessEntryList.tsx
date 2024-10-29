import {Business, City} from "@/util/db";
import BusinessEntry from "@/components/cards/BusinessEntry";

export default function BusinessEntryList({entries}: { entries: (Business & City)[] }) {
    return (
        <>
            {entries.map(business => (
                <BusinessEntry key={business.id} business={business}/>
            ))}
        </>);
}

