
export async function onRequest(context) {
    const clientId = context.env.GITHUB_CLIENT_ID;
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user:email`;
    return Response.redirect(githubAuthUrl);
}
