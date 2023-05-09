<script lang="ts">
	export let category: string;
	export let wallet: string;
</script>

<div class="RecordCard px-5 pt-3 pb-3 border-b border-agray-400">
	<div class="flex justify-between">
		<div class="font-semibold text-header5 font-primary text-agray-700">{category}</div>
		<div class="text-secondary font-primary font-semibold">-₱2,500</div>
	</div>
	<div class="flex justify-between">
		<div class="text-xs leading-3 font-primary text-agray-500">{wallet}</div>
		<div class="text-xs font-primary text-agray-500">Nov 10</div>
	</div>
</div>
