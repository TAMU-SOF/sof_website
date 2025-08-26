import { put } from '@vercel/blob';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
  try {
    const data = await req.json();

    const filename = `submission-${uuidv4()}.json`;

    const isVercel = process.env.VERCEL === '1';

    const blob = await put(filename, JSON.stringify(data), {
    access: isVercel ? 'public' : 'public'
});


    return new Response(JSON.stringify({ success: true, url: blob.url }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: 'Server error' }), { status: 500 });
  }
}
