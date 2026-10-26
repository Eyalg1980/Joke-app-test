// Milestone 1: a temporary joke. Reports only whether the key exists, never the key itself.
export default {
  async fetch(request) {
    if (request.method !== 'POST') {
      return Response.json({ error: 'אפשר לבקש בדיחה רק בלחיצה על הכפתור.' }, { status: 405 });
    }

    let topic = '';
    try {
      const body = await request.json();
      if (typeof body?.topic === 'string') topic = body.topic.trim().slice(0, 100);
    } catch {
      // A broken body counts as "no topic".
    }

    const hasKey = Boolean(process.env.OPENAI_API_KEY);
    console.log(`joke request: topic="${topic}" key=${hasKey ? 'found' : 'missing'}`);

    const subject = topic || 'בלי נושא';
    return Response.json({
      joke: `בדיחה זמנית מהשרת: ${subject}. המפתח: ${hasKey ? 'נמצא' : 'חסר'}`,
    });
  },
};
