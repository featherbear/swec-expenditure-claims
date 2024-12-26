import { env } from '$env/dynamic/private'
import { redirect } from '@sveltejs/kit'

export function GET() {
    const params = new URLSearchParams({
        type: "web_server",
        client_id: env.ELVANTO_CLIENT_ID,
        redirect_uri: env.ELVANTO_REDIRECT_URI,
        scope: ['ManagePeople'].join(",")
        // state: ''
    })


    return redirect(307, "https://api.elvanto.com/oauth?" + params.toString())
    // https://api.elvanto.com/oauth?type=web_server&client_id={client_id}&redirect_uri={redirect_uri}&scope={scope}&state={state}
}