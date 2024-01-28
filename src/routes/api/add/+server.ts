import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

let currentStation = 0;
let NextStation = false;
let Arrived = true;
let lastState = 1;
let TerminalStation = 38;
let DisplayState = 0;

/// STATE
/// 0:Terminated Service at Station
/// 1:Arriving Station
/// 2:Departing Station
/// 3:Service Disrubted
//TODO: ADD Service Disrub

export const POST = async ({ request }) => {
	const { normalOP, Destination } = await request.json();
	if (normalOP == true) {
		let excuted = false;
		TerminalStation = Destination;
		DisplayState = 0;

		if (lastState == 2 && excuted == false && Destination > currentStation) {
			currentStation = currentStation + 1;

			lastState = 1;
			excuted = true;
			DisplayState = 2;
		} else if (lastState == 2 && excuted == false && Destination < currentStation) {
			currentStation = currentStation - 1;
			lastState = 1;
			excuted = true;
			DisplayState = 2;
		} else if (
			lastState == 1 &&
			excuted == false &&
			(Destination < currentStation || Destination > currentStation)
		) {
			lastState = 2;
			excuted = true;
			DisplayState = 1;
		} else {
			lastState = 2;
			excuted = true;
			DisplayState = 0;
		}
	} else if (normalOP == false) {
		currentStation = currentStation;
		DisplayState = DisplayState;
		TerminalStation = Destination ?? 0;
	}
	console.log('Now station:', currentStation);
	let NextStationLog = currentStation + 1;
	console.log('Next station:', NextStationLog);

	console.log('Last State', lastState);
	console.log('Display', DisplayState);
	return new Response(
		JSON.stringify({
			message: 'Success',
			Station: currentStation,
			Next: NextStation,
			Arrive: Arrived,
			DisplayState: DisplayState
		}),
		{ status: 200 }
	);
};

/// STATE
/// 0:Terminated Service at Station
/// 1:Arriving Station
/// 2:Departing Station
/// 3:Service Disrubted
///
export const PUT = async ({ request }) => {
	const { normalOP, Destination, State, Station } = await request.json();
	if (normalOP == true) {
		let excuted = false;

		TerminalStation = Destination ?? 0;
		DisplayState = 0 ?? 0;

		if (lastState == 2 && excuted == false && Destination > currentStation) {
			currentStation = currentStation + 1;

			lastState = 1;
			excuted = true;
			DisplayState = 2;
		} else if (lastState == 2 && excuted == false && Destination < currentStation) {
			currentStation = currentStation - 1;

			lastState = 1;
			excuted = true;
			DisplayState = 2;
		} else if (
			lastState == 1 &&
			excuted == false &&
			(Destination < currentStation || Destination > currentStation)
		) {
			lastState = 2;
			excuted = true;
			DisplayState = 1;
		}
	} else if (normalOP == false) {
		currentStation = Station ?? 0;
		DisplayState = State ?? 0;
		TerminalStation = Destination ?? 0;
	}

	console.log('Now station:', currentStation);
	let NextStationLog = currentStation + 1;
	console.log('Next station:', NextStationLog);

	console.log('Last State', lastState);
	console.log('Display', DisplayState);
	return new Response(
		JSON.stringify({
			message: 'Success',
			Station: currentStation,
			Next: NextStation,
			Arrive: Arrived,
			DisplayState: DisplayState
		}),
		{ status: 200 }
	);
};
export const GET = async ({}) => {
	return new Response(
		JSON.stringify({
			message: 'Success',
			body: {
				Station: currentStation,
				DisplayState: DisplayState,
				TerminalStation: TerminalStation
			}
		}),
		{ status: 200 }
	);
};
