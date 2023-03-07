<script lang="ts">
	export let category: string;
	export let wallet: string;
</script>

<div class="RecordCard px-8 pt-6 pb-4 border-b border-sky-500">
	<div class="flex justify-between">
		<div class="font-semibold text-header5 font-primary">{category}</div>
		<div class="text-secondary font-primary  font-semibold">-₱2,500</div>
	</div>
	<div class="flex justify-between">
		<div class="text-xs leading-3">{wallet}</div>
		<div class="text-xs ">Nov 10</div>
	</div>
</div>
