import { attachmentRequests, db } from "$lib/server/db"




export async function GET() {
    let data = await db.select().from(attachmentRequests);
        console.log(data);
}