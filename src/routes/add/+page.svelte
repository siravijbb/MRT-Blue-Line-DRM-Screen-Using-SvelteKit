<script>
	import { onMount } from 'svelte';

	const stations = [
		'Tha Phra',
		'Charan 13',
		'Fai Chai',
		'Bang Khun Non',
		'Bang Yi Khan',
		'Sirindhorn',
		'Bang Phlat',
		'Bang O',
		'Bang Pho',
		'Tao Poon',
		'Bang Sue',
		'Kamphaeng Phet',
		'Chatuchak Park',
		'Phahon Yothin',
		'Lat Phrao',
		'Ratchadaphisek',
		'Sutthisan',
		'Huai Khwang',
		'Thailand Cultural Centre',
		'Phra Ram 9',
		'Phetchaburi',
		'Sukhumvit',
		'Queen Sirikit National Convention Centre',
		'Khlong Toei',
		'Lumphini',
		'Si Lom',
		'Sam Yan',
		'Hua Lamphong',
		'Wat Mangkon',
		'Sam Yot',
		'Sanam Chai',
		'Itsaraphap',
		'Tha Phra',
		'Bang Phai',
		'Bang Wa',
		'Phetkasem 48',
		'Phasi Charoen',
		'Bang Khae',
		'Lak Song'
	];

	/**
	 * @type {string | null}
	 */
	let selectedStation = null;
	/**
	 * @type {boolean}
	 */
	let Arrived;
	async function fetchData() {
		const response = await fetch('/api/add');
		if (response.ok) {
			const json = await response.json();
			const stationIndex = json.body.Station; // Assuming this is a zero-based index
			const ArriveYet = json.body.NextStation; // Assuming this is a zero-based index
			if (stationIndex >= 0 && stationIndex < stations.length) {
				selectedStation = stations[stationIndex];
			}
			if (ArriveYet == true) {
				Arrived = true;
			} else {
				Arrived = false;
			}
		}
	}

	onMount(() => {
		let interval = setInterval(fetchData, 1000); // Poll every 5 seconds
		console;
		return () => {
			clearInterval(interval);
		};
	});
</script>

<main class="flex h-screen">
	<body class="bg-blue-600 my-auto text-left text-3xl lg:text-9xl">
		{#if selectedStation !== null && Arrived === true}
			<p class="text-3xl lg:text-9xl text-yellow-300 animate-pulse">
				สถานีต่อไป: {selectedStation}
			</p>
			<p class="text-3xl lg:text-9xl mt-72 text-white animate-pulse">
				Next Station: {selectedStation}
			</p>
		{:else if selectedStation !== null && Arrived === false}
			<p class="text-3xl lg:text-9xl text-yellow-300 animate-pulse">สถานี: {selectedStation}</p>
			<p class="text-3xl lg:text-9xl mt-72 text-white animate-pulse">Station: {selectedStation}</p>
		{:else}
			<div>Loading station data...</div>
		{/if}
	</body>
</main>
