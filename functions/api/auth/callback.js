
export async function onRequest(context) {
    const url = new URL(context.request.url);
    const code = url.searchParams.get('code');
    const env = context.env;

    if (!code) return new Response('No code provided', { status: 400 });

    if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
        return new Response('Error: GitHub OAuth variables not found. Please add GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET to your Cloudflare Pages settings.', { status: 500 });
    }

    if (!env.QUANTFLOW_DATA) {
        return new Response('Error: KV namespace QUANTFLOW_DATA not bound. Please bind a KV namespace in Cloudflare Pages settings.', { status: 500 });
    }

    try {
        // Exchange code for access token
        const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                client_id: env.GITHUB_CLIENT_ID,
                client_secret: env.GITHUB_CLIENT_SECRET,
                code,
            }),
        });

        const tokenData = await tokenResponse.json();
        if (tokenData.error) return new Response(tokenData.error_description, { status: 400 });

        // Get User Info
        const userResponse = await fetch('https://api.github.com/user', {
            headers: {
                'Authorization': `Bearer ${tokenData.access_token}`,
                'User-Agent': 'QuantFlow-Backend',
            },
        });
        const userData = await userResponse.json();

        // Generate session token
        const sessionToken = crypto.randomUUID();
        await env.QUANTFLOW_DATA.put(`session:${sessionToken}`, userData.login, { expirationTtl: 86400 * 30 }); // 30 days

        // Redirect back to frontend
        // For Pages, we redirect to the root explicitly
        const frontendUrl = url.origin;
        return Response.redirect(`${frontendUrl}?token=${sessionToken}`);

    } catch (err) {
        return new Response(err.message, { status: 500 });
    }
}
