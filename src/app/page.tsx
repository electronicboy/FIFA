import Maps, {Poi, PoiMarkers} from "@/components/layout/Maps";
import {Business, db} from "@/util/db";

export default async function Home() {
    const businesses = await db().query<Business & {id: number}>( /* language=PostgreSQL */ "SELECT id, name, longitude, latitude FROM biz_businesses");
    const poi: Poi[] = businesses.rows.map((business) => { return {key: business.id.toString(), location: {lat: business.latitude, lng: business.longitude}}})
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <Maps>
                {poi && (
                    <PoiMarkers pois={poi}/>
                )}
            </Maps >
            <main></main>
        </div>
    );
}
