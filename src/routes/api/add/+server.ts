import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

let currentStation = 0;
let NextStation = false;
let Arrived = true;
let lastState = 1;
let arriveYet;
let TerminalStation = 38

export const POST = async ({ request }) => {
	const { normalOP,Destination } = await request.json();
	if (normalOP == true) {
		let excuted = false;
		let Next = false;
		let Arriving = false;
		TerminalStation = Destination

		if (lastState == 2 && excuted == false && Destination > currentStation) {
			currentStation = currentStation + 1;
			Next = true;
			Arriving = false;
			lastState = 1;
			excuted = true;
		} else if (lastState == 2 && excuted == false && Destination < currentStation) {
			currentStation = currentStation - 1;
			Next = true;
			Arriving = false;
			lastState = 1;
			excuted = true;
		} 
		else if (lastState == 1 && excuted == false && (Destination < currentStation || Destination > currentStation)) {
			Next = false;
			Arriving = true;
			lastState = 2;
			excuted = true;
		} 
		console.log('Now station:', currentStation);
		let NextStationLog = currentStation + 1;
		console.log('Next station:', NextStationLog);

		NextStation = Next; // T or F
		Arrived = Arriving; // T or F
		console.log('State', lastState);
		console.log('Arriving', Arriving);
		return new Response(
			JSON.stringify({
				message: 'Success',
				Station: currentStation,
				Next: NextStation,
				Arrive: Arrived
			}),
			{ status: 200 }
		);
	}
};

/// STATE
/// 0:Terminated Service at Station
/// 1:Arriving Station
/// 2:Departing Station
/// 3:Service Disrubted
//TODO: ADD Service Disrub
export const PUT = async ({ request }) => {
	const { normalOP,Destination,State,Station } = await request.json();
	if (normalOP == true) {
		let excuted = false;
		let Next = false;
		let Arriving = false;
		let lastState = State
		currentStation = Station
		if (lastState == 2 && excuted == false && Destination > currentStation) {
			currentStation = currentStation + 1;
			Next = true;
			Arriving = false;
			lastState = 1;
			excuted = true;
		} else if (lastState == 2 && excuted == false && Destination < currentStation) {
			currentStation = currentStation - 1;
			Next = true;
			Arriving = false;
			lastState = 1;
			excuted = true;
		} 
		else if (lastState == 1 && excuted == false && (Destination < currentStation || Destination > currentStation)) {
			Next = false;
			Arriving = true;
			lastState = 2;
			excuted = true;
		} 
		console.log('Now station:', currentStation);
		let NextStationLog = currentStation + 1;
		console.log('Next station:', NextStationLog);

		NextStation = Next; // T or F
		Arrived = Arriving; // T or F
		console.log('State', lastState);
		console.log('Arriving', Arriving);
		return new Response(
			JSON.stringify({
				message: 'Success',
				Station: currentStation,
				Next: NextStation,
				Arrive: Arrived
			}),
			{ status: 200 }
		);
	}
};
export const GET = async ({}) => {
	return new Response(
		JSON.stringify({
			message: 'Success',
			body: { Station: currentStation, Next: NextStation, Arrive: Arrived,TerminalStation: TerminalStation  }
		}),
		{ status: 200 }
	);
};
