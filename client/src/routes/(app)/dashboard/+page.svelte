<script>
// @ts-nocheck

	import RecordCard from '../../../components/RecordCard.svelte';
	export let data;
</script>

<div>
	<div class="flex mx-3 mt-4 db-nav">
		<div class="flex justify-center items-center">
			<div class="w-4 h-4 my-auto bg-light-green rounded-full mr-5" />
		</div>
		<div class="font-primary font-semibold mr-56 text-header5 text-black">Dashboard</div>
		<div class="flex justify-center items-center">
			<img class="w-4 h-4 my-auto" src="/Bell.svg" alt="background" />
		</div>
	</div>
	<div class="db-summary mx-3">
		<div class="flex flex-col bg-agray-50 rounded-xl border border-agray-200 border-solid">
			<div class="mx-5 my-3 flex flex-row justify-between items-center ">
				<div class="font-primary text-header5 text-agray-700 font-semibold">February 28, 2022</div>

				<img class="w-4 h-4 my-auto" src="/ThreeDots.svg" alt="background" />
			</div>
			<div class="mx-5  mb-2 flex flex-row justify-between items-center ">
				<div class="font-primary  font-normal  text-gdark text-xs">Total Income</div>
				<div class="font-primary  font-semibold text-primary text-xs">₱{data.monthlySummary[0]}</div>
			</div>
			<div
				class="mx-5  flex flex-row justify-between items-center pb-1.5 border-b border-sky-500 mb-1.5"
			>
				<div class="font-primary  font-normal  text-agray-700 text-xs">Total Expenses</div>
				<div class="font-primary  font-semibold text-secondary text-xs">-₱{data.monthlySummary[1]}</div>
			</div>
			<div class="mx-5  flex flex-row justify-between items-center pb-4">
				<div class="font-primary  font-normal  text-agray-700 text-xs">Total</div>
				<div class="font-primary  font-semibold text-agray-700 text-xs">₱{data.monthlySummary[0]-data.monthlySummary[1]}</div>
			</div>
		</div>
	</div>
	<div class="flex mx-3 mt-3.5 mb-1.5">
		<div class="text-header5 font-primary font-semibold">Wallets</div>
	</div>
	<div class="flex carousel mx-3">
		<div class="flex flex-col pl-2 pt-3 mr-3 grow h-16 bg-primary rounded-lg">
			<div class="text-agray-200 font-medium text-xs font-primary">{data.wallets[0].name}</div>
			<div class="text-agray-200 font-primary font-semibold text-header5">₱{data.wallets[0].balance}</div>
		</div>

		<div class="flex flex-col pl-2 pt-3 mr-3 grow h-16 bg-primary rounded-lg">
			<div class="text-agray-200 font-medium text-xs font-primary">{data.wallets[1].name}</div>
			<div class="text-agray-200 font-primary font-semibold text-header5">₱{data.wallets[1].balance}</div>
		</div>

		<div class="flex flex-col pl-2 pt-3 grow -16 bg-primary rounded-lg">
			<div class="text-agray-200 font-medium text-xs font-primary">{data.wallets[2].name}</div>
			<div class="text-agray-200 font-primary font-semibold text-header5">₱{data.wallets[2].balance}</div>
		</div>
	</div>
	<div class="flex mx-3 mt-5 mb-4">
		<div class="text-header5 font-primary font-semibold">Records</div>
	</div>
	<div class="flex mx-3 space-x-1.5">
		<div class="bg-agray-200 text-xs py-2.5 rounded-lg font-medium px-3">All</div>
		<div class="bg-agray-200 text-xs py-2.5 rounded-lg px-3">Income</div>
		<div class="bg-agray-200 text-xs py-2.5 rounded-lg px-3">Expense</div>
		<div class="bg-agray-200 text-xs py-2.5 rounded-lg px-3">Transfer</div>
	</div>
	<div class="flex flex-col">
		<RecordCard category="Foods & Drinks" wallet="Cash" />
		<RecordCard category="Income" wallet="Bank" />
		<RecordCard category="Foods & Drinks" wallet="Gcash" />
	</div>
</div>
