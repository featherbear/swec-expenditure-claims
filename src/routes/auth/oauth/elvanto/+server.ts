import { env } from '$env/dynamic/private'
import type { UUID } from '$lib/types/interop.js'
import type { UserType } from '$lib/types/UserType.js'
import { redirect } from '@sveltejs/kit'

export async function GET({ url }) {
    const error = url.searchParams.get("error")
    const code = url.searchParams.get("code")

    if (error) {
        const error_description = url.searchParams.get("error_description")
        console.log(error_description, error);
        return new Response()
    }

    if (!code) {
        return new Response()
    }

    const body = new FormData()
    body.set("grant_type", "authorization_code")
    body.set("client_id", env.ELVANTO_CLIENT_ID)
    body.set("client_secret", env.ELVANTO_CLIENT_SECRET)
    body.set("code", code)
    body.set("redirect_uri", env.ELVANTO_REDIRECT_URI)

    const response: {
        access_token: string
        /**
         * seconds
         */
        expires_in: number
        refresh_token: string
    } = await fetch("https://api.elvanto.com/oauth/token", {
        method: "POST",
        body

    }).then(r => r.json())

    // whoami
    console.log(response);



    const currentUser = await fetch("https://api.elvanto.com/v1/people/currentUser.json", {
        method: "POST",
        headers: { "Authorization": "Bearer " + response.access_token }
    })
        .then(r => r.json())
        .then(j => j['person'][0])
        .then(o => <UserType>{
            firstName: o['preferred_name'],
            lastName: o['lastname'],
            email: o['email'],
            picture: o['picture'],
            id: o['id']
        }).catch(() => null)


    if (!currentUser) {
        console.error("AAAA")
        return new Response()
    }

    console.log(currentUser);
    return new Response()
}