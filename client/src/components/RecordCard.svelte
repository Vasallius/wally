<script lang="ts">
	export let category: string;
	export let wallet: string;
	export let amount: number;
	export let date: string;
</script>

<div class="RecordCard pt-6 pb-4 border-b border-agray-400">
	<div class="flex justify-between">
		<div class="font-semibold text-header5 font-primary">{category}</div>
		<div class="text-secondary font-primary  font-semibold">{amount}</div>
	</div>
	<div class="flex justify-between">
		<div class="text-xs leading-3">{wallet}</div>
		<div class="text-xs ">{date}</div>
	</div>
</div>
