import {auth, clerkClient} from "@clerk/nextjs/server";
import {db} from "@/util/db";
import OnboardingComponent from "@/components/onboarding/OnboardingComponent";
import {redirect} from "next/navigation";
import {QueryResult} from "pg";

export default async function OnboardingPage({searchParams}: { searchParams: Promise<{ redirect?: string }> }) {
    const redirectUrl = (await searchParams).redirect;

    async function processUpdate(data: FormData): Promise<{ success: boolean, error?: string }> {
        "use server";

        const {userId} = await auth();

        console.log(userId);
        if (userId == null) {
            return {success: false, error: "You are not logged in"};
        }

        const username = data.get("username");
        let insert: QueryResult | null = null;
        try {
            insert = await db().query(/* language=PostgreSQL*/
                `INSERT INTO biz_users (name, clerk) VALUES ($1, $2) ON CONFLICT ON CONSTRAINT biz_users_unique_clerk DO UPDATE SET name = excluded.name`
                , [username, userId]);

        } catch (e) {
            console.error(e);
            return {success: false, error: "An internal error occured"};
        }


        if (insert.rowCount != 0) {

            const client = await clerkClient();

            await client.users.updateUser(userId, {
                publicMetadata: {
                    onboardingComplete: true
                }
            });
            redirect(redirectUrl ? decodeURIComponent(redirectUrl) : "/");
        } else {
            console.log("Failed to insert data?!")
            return {success: false, error: "An internal error occured"};
        }
    }


    return (
        <OnboardingComponent updateAction={processUpdate}/>
    );


}
