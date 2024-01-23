import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

let storedData = 0;

export const POST = async ({ request }) => {
	const { Station } = await request.json();
	console.log("Plus station:",Station);
	storedData = Station
	console.log("Now station:",storedData)
	return new Response(JSON.stringify({ message: 'Success' }), { status: 201 });
};
export const GET = async () => {
	return new Response(JSON.stringify({ message: 'Success', body: storedData }), { status: 201 });
};
