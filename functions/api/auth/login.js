
export async function onRequest(context) {
    const clientId = context.env.GITHUB_CLIENT_ID;
    if (!clientId) {
        return new Response('Error: GITHUB_CLIENT_ID not found in environment variables. Please add it to your Cloudflare Pages settings.', { status: 500 });
    }
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user:email`;
    return Response.redirect(githubAuthUrl);
}
