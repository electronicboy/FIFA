import Image from "next/image";
import { Category, db } from "@/util/db";
import Link from "next/link";

export default async function Footer() {
    const categories = await db().query<Category & { id: number }>(`SELECT cat.id, cat.name, (
      SELECT count(*) 
      FROM biz_business_category 
      WHERE business = cat.id) AS total 
      FROM biz_category cat 
      ORDER BY total 
      DESC LIMIT 4;`);

    const locations = await db().query(`SELECT loc.id, loc.location_name, loc.country, (
        SELECT count(*) 
        FROM biz_businesses WHERE city = loc.id) as total 
        FROM biz_locations loc 
        ORDER BY total 
        DESC LIMIT 4`);

    return (
        <div className="grid grid-cols-4 gap-4 p-6 text-center items-center ">
            <div>
                <Image
                    src="/LogoTrans.png"
                    width={100}
                    height={40}
                    alt="Find if Faster Logo"
                    className="justify-items-center"
                />
                <br />
            </div>

            <div>
                <h2 className="text-fuchsia-400">Popular Categories:</h2>
                {categories.rows.map((category) => (
                    <p key={category.id}>
                        <Link href={`/search?category=${category.id}`}>{category.name}</Link>
                    </p>
                ))}
                <br />
            </div>
            <div>
                <h2 className="text-fuchsia-400">Popular Location:</h2>
                {locations.rows.map((location) => (
                    <p key={location.id}>
                        <Link href={`/search?location=${location.id}`}>
                            {location.location_name}, {location.country}
                        </Link>
                    </p>
                ))}
                <br />
                <br />
            </div>
            <div>
                <h2 className="text-fuchsia-400">Resources:</h2>
                <p>About Us</p>
                <p>Write a Review</p>
                <p>Add a Business</p>
                <p>Search for a company</p>
                <br />
            </div>
        </div>
    );
}
