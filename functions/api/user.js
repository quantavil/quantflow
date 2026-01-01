
export async function onRequest(context) {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*', // Pages handles CORS internally usually, but safe to add
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (context.request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    const authHeader = context.request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return new Response('Unauthorized', { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const userId = await context.env.QUANTFLOW_DATA.get(`session:${token}`);

    if (!userId) {
        return new Response('Invalid session', { status: 401 });
    }

    return new Response(JSON.stringify({ userId }), {
        headers: { 'Content-Type': 'application/json' }
    });
}
