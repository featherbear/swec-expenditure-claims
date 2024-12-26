import { db, attachments, attachmentRequests } from "$lib/server/db";
import type { AttachmentUploadRequestType } from "$lib/types/AttachmentUploadRequest.js";
import type { UUID } from "$lib/types/interop.js";
import { and, eq } from "drizzle-orm";

let mock: [number, string, number][] = []
let i = 0;

async function createRequest(request: AttachmentUploadRequestType) {
    let vals = await db.insert(attachmentRequests).values({
        author: "ABC",
        filename: request.filename,
        hash: request.hash,
        size: request.size,
    }).returning()
    console.log(vals);
    return vals
}

export async function POST({ request: data }) {
    const request: AttachmentUploadRequestType = await data.json()

    if (request.hash) {

    }

    let results = await db.select().from(attachmentRequests).where(
        and(
            eq(attachmentRequests.hash, request.hash),
            eq(attachmentRequests.size, request.size))
    )

    return new Response(JSON.stringify({
        id: createRequest(request),
        matches: results
    }))
}

export function PATCH() {

}



export async function GET() {
    let resp = await createRequest({
        filename: 'filename test',
        hash: 'aabbcc',
        size: 221
    })

    console.log(resp);

    return new Response("OK")

}