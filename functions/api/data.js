
export async function onRequest(context) {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    const request = context.request;
    if (request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return new Response('Unauthorized', { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const userId = await context.env.QUANTFLOW_DATA.get(`session:${token}`);

    if (!userId) {
        return new Response('Invalid session', { status: 401 });
    }

    if (request.method === 'GET') {
        const data = await context.env.QUANTFLOW_DATA.get(`user_data:${userId}`);
        return new Response(data || '{}', {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    if (request.method === 'POST') {
        const body = await request.text();
        if (body.length > 102400) { // 100KB limit
            return new Response('Payload too large', { status: 413 });
        }
        await context.env.QUANTFLOW_DATA.put(`user_data:${userId}`, body);
        return new Response(JSON.stringify({ success: true }), {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    return new Response('Method not allowed', { status: 405 });
}
