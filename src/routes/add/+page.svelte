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
	];

	/**
	 * @type {string | null}
	 */
	let selectedStation = stations[0];
	/**
	 * @type {string | null}
	 */
	let thaiSelectedStation = thaiStationName[0];
	let State = 0;
	let THTerminalStation = '';
	let ENTerminalStation = '';
	async function fetchData() {
		const response = await fetch('/api/add');
		if (response.ok) {
			const json = await response.json();
			const stationIndex = json.body.Station; // Assuming this is a zero-based index
			const TerminalStation = json.body.TerminalStation;
			if (stationIndex >= 0 && stationIndex < stations.length) {
				selectedStation = stations[stationIndex];
				thaiSelectedStation = thaiStationName[stationIndex];
				ENTerminalStation = stations[TerminalStation];
				THTerminalStation = thaiStationName[TerminalStation];
			}
			const DisplayState = json.body.DisplayState;
			State = DisplayState;
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

<main class="flex h-full w-full">
	<body class="bg-blue-600 text-left text-3xl lg:text-9xl">
		{#if selectedStation !== null && State == 2}
			<p class="text-3xl lg:text-9xl text-yellow-300">สถานีต่อไป:</p>
			<p class="text-3xl lg:text-9xl text-white">Next Station:</p>
			<div class="my-auto text-center absolute flex w-full">
				<div class="mx-auto my-32 justify-items-center content-center">
					<p class=" text-3xl lg:text-9xl text-yellow-300 animate-pulse">
						{thaiSelectedStation}
					</p>
					<p class="text-3xl lg:text-9xl text-white animate-pulse">
						{selectedStation}
					</p>
				</div>
			</div>
			<div
				class="w-full h-40 fixed bottom-0 bg-yellow-400 z-50 p-2 text-white text-center"
				id="footer"
			>
				<p class="text-6xl w-full mt-3">
					รถไฟฟ้าขบวนนี้สิ้นสุดให้บริการที่ <b>{THTerminalStation}</b>
				</p>
				<p class="text-6xl w-full">This train terminated at <b>{ENTerminalStation}</b></p>
			</div>
		{:else if selectedStation !== null && State == 1}
			<p class="text-3xl lg:text-9xl text-yellow-300">สถานี:</p>
			<p class="text-3xl lg:text-9xl text-white">Station:</p>
			<div class="my-auto text-center absolute flex w-full">
				<div class="mx-auto my-32 justify-items-center content-center">
					<p class=" text-3xl lg:text-9xl text-yellow-300 animate-pulse">
						{thaiSelectedStation}
					</p>
					<p class="text-3xl lg:text-9xl text-white animate-pulse">
						{selectedStation}
					</p>
				</div>
			</div>
		{:else if selectedStation !== null && State == 0}
			<p class="text-3xl lg:text-9xl text-yellow-300">สถานี:</p>
			<p class="text-3xl lg:text-9xl text-white">Station:</p>
			<div class="my-auto text-center absolute flex w-full">
				<div class="mx-auto my-48 justify-items-center content-center">
					<p class=" text-3xl lg:text-9xl text-yellow-300 animate-pulse">
						{thaiSelectedStation}
					</p>
					<p class="text-3xl lg:text-9xl text-white animate-pulse">
						{selectedStation}
					</p>
				</div>
			</div>
			<div
				class="w-full h-20 lg:h-40 fixed bottom-20 lg:bottom-40 bg-[#FA8128] z-50 p-2 text-white text-center"
				id="footer"
			>
				<p class="text-sm lg:text-6xl w-full mt-3">
					ท่านสามารถเปลี่ยนเส้นทางไปยัง <b>สายสีส้ม</b> ได้ที่สถานีนี้
				</p>
				<p class="text-sm lg:text-6xl w-full">
					Interchange with <b>Orange Line</b> at This station
				</p>
			</div>
			<div
				class="w-full h-20 lg:h-40 fixed bottom-0 bg-red-500 z-50 p-2 text-white text-center"
				id="footer"
			>
				<p class="text-sm lg:text-6xl w-full mt-3">
					รถไฟฟ้าขบวนนี้สิ้นสุดให้บริการที่ <b>สถานีนี้</b>
				</p>
				<p class="text-sm lg:text-6xl w-full">This train terminated at <b>This Station</b></p>
			</div>
		{:else if State == 3}
			<div class="my-auto text-center absolute flex w-full">
				<div class="mx-auto lg:mt-80 justify-items-center content-center">
					<p class=" text-4xl lg:text-9xl text-white text-bold mb-10">
						ผู้โดยสารโปรดทราบ / Attention Please
					</p>
					<p class=" text-3xl lg:text-5xl text-white">
						เนื่องจากมีเหตุขัดข้องในระบบเดินรถทำให้ขบวนไม่สามารถเคลื่อนที่ได้
						ขณะนี้กำลังอยู่ระหว่างการดำเนินแก้ไขกรุณารอสักครู่
					</p>
					<p class="text-3xl lg:text-5xl text-white mb-4">ขออภัยในความไม่สะดวก</p>
					<p class="text-3xl lg:text-5xl text-white">
						Due to technical problem, This train will be delayed. We apologise for any
						inconvenience.
					</p>
				</div>
			</div>
		{:else}
			<div>Loading station data...</div>
		{/if}
	</body>
	<!--
		<div
		class="w-full h-40  fixed bottom-0 bg-[#FA8128] z-50 p-2 text-white text-center "
		id="footer"
	>
		<p class="text-6xl w-full mt-3 ">ท่านสามารถเปลี่ยนเส้นทางไปยัง <b>สายสีส้ม</b> ได้ที่สถานีนี้</p>
		<p class="text-6xl w-full ">Interchange with <b>Orange Line</b> At this station</p>
	</div> -->
</main>
