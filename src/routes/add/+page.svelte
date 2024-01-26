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
	const thaiStationName = [
		'ท่าพระ',
'จรัญฯ 13',
'ไฟฉาย',
'บางขุนนนท์',
'บางยี่ขัน',
'สิรินธร',
'บางพลัด',
'บางอ้อ',
'บางโพ',
'เตาปูน',
'บางซื่อ',
'กำแพงเพชร',
'สวนจตุจักร',
'พหลโยธิน',
'ลาดพร้าว',
'รัชดาภิเษก',
'สุทธิสาร',
'ห้วยขวาง',
'ศูนย์วัฒนธรรมแห่งประเทศไทย',
'พระราม 9',
'เพชรบุรี',
'สุขุมวิท',
'ศูนย์การประชุมแห่งชาติสิริกิติ์',
'คลองเตย',
'ลุมพินี',
'สีลม',
'สามย่าน',
'หัวลำโพง',
'วัดมังกร',
'สามยอด',
'สนามชัย',
'อิสรภาพ',
'ท่าพระ',
'บางไผ่',
'บางหว้า',
'เพชรเกษม 48',
'ภาษีเจริญ',
'บางแค',
'หลักสอง'
	]

	/**
	 * @type {string | null}
	 */
	let selectedStation = stations[0];
		/**
	 * @type {string | null}
	 */
	 let thaiSelectedStation = thaiStationName[0];
	/**
	 * @type {boolean}
	 */
	let Arrive;
		/**
	 * @type {boolean}
	 */
	 let Next;
	async function fetchData() {
		const response = await fetch('/api/add');
		if (response.ok) {
			const json = await response.json();
			const stationIndex = json.body.Station; // Assuming this is a zero-based index
			if (stationIndex >= 0 && stationIndex < stations.length) {
				selectedStation = stations[stationIndex];
				thaiSelectedStation = thaiStationName[stationIndex]
			}
			const isArriveYet = json.body.Arrive; // Assuming this is a zero-based index
			const isNext = json.body.Next
			Arrive = isArriveYet
			Next = isNext
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
		{#if selectedStation !== null && Arrive === false && Next === true}
			<p class="text-3xl lg:text-9xl text-yellow-300 animate-pulse">
				สถานีต่อไป: {thaiSelectedStation}
			</p>
			<p class="text-3xl lg:text-9xl mt-72 text-white animate-pulse">
				Next Station: {selectedStation}
			</p>




		{:else if selectedStation !== null && Arrive === true && Next === false}
			<p class="text-3xl lg:text-9xl text-yellow-300 animate-pulse">สถานี: {thaiSelectedStation}</p>
			<p class="text-3xl lg:text-9xl mt-72 text-white animate-pulse">Station: {selectedStation}</p>










		{:else if selectedStation !== null && Arrive === false && Next === false}
			<p class="text-3xl lg:text-9xl text-yellow-300 animate-pulse">สถานี: {thaiSelectedStation}</p>
			<p class="text-3xl lg:text-9xl mt-72 text-white animate-pulse">Station: {selectedStation}</p>
		{:else}
			<div>Loading station data...</div>
		{/if}
	</body>
</main>
