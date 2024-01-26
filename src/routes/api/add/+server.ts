import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

let storedData = 0;
let NextStation = false;
let Arrive = true
let lastState = 1
let arriveYet

export const POST = async ({ request }) => {
	const { normalOP } = await request.json();
if(normalOP == true){
	let excuted = false
	let Next = false
	let Arriving = false
	
	if(lastState == 1 && excuted == false){
		storedData = storedData + 1
		Next = true
		Arriving = false
		lastState = 2
		excuted = true
	}
	else if(lastState == 2 && excuted == false){
		Next = false
		Arriving = true
		lastState = 1
		excuted = true
   } 
   
	
	console.log('Now station:', storedData);
   	let NextStationLog = storedData + 1
	console.log('Next station:', NextStationLog);

	NextStation = Next; // T or F
	Arrive = Arriving // T or F
	console.log('State',lastState)
	console.log('Arriving', Arriving);
	return new Response(
		JSON.stringify({ message: 'Success', Station: storedData, Next: NextStation, Arrive: Arrive }),
		{ status: 201 }
	);
}
};
export const PUT = async ({ request }) => {
	const { normalOP, Station,Status } = await request.json();


	let Next = false
	let Arriving = false


	if(Status == 1){
		 Next = true
		 Arriving = false
	}
	else if(Status == 2){
		Next = false
		Arriving = true
   } else {
		Next = false
		Arriving = false
   }

	console.log('Plus station:', Station);
	storedData = Station;

	NextStation = Next;
	console.log('Now station:', storedData);

	Arrive = Arriving
	console.log('Arriving', Arriving
	);
	return new Response(
		JSON.stringify({ message: 'Success', Station: storedData, Next: NextStation, Arrive: Arrive }),
		{ status: 201 }
	);
};
export const GET = async ({}) => {
	return new Response(
		JSON.stringify({ message: 'Success', body: {Station: storedData, Next: NextStation, Arrive: Arrive } }),
		{ status: 201 }
	);
};
