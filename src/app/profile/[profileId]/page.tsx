import { db, User } from '@/util/db';
import { notFound } from 'next/navigation';
//import { auth } from "@clerk/nextjs/server"
import { Card } from "@chakra-ui/react"




export default async function Profile({params}: {params: {profileId: string}}) {
  const id = !isNaN(Number(params.profileId))? Number(params.profileId): null
  if ( id == null ){notFound()}
  //const {userId} = await auth()
  
  
  const userResult = await db().query<User>('SELECT * FROM biz_users WHERE id = $1;', [id]);
  if ( userResult.rowCount == 0 ){notFound();}
  //const reviewsResult = await db().query('SELECT * FROM biz_reviews WHERE user_id = $1:', [id]);

  const user = userResult.rows[0];
  //const isSelf = user.clerk == userId
  //const reviews = reviewsResult.rows;

return (
 <>
  <div>
  <Card.Root>
  <Card.Header> Welcome to {user.name}&apos;s Profile</Card.Header>
  <Card.Body />
  <Card.Footer />
</Card.Root>
  </div>
 </>
);

  }
