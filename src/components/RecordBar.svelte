<script lang="ts">
	import Records from '$components/Records.svelte';
	import Tab from '$components/Tab.svelte';
	import TabPanel from '$components/TabPanel.svelte';
	import Tabs from '$components/Tabs.svelte';
</script>

<div class="flex mx-3 mt-5 mb-4">
	<div class="text-header5 font-primary font-semibold">Records</div>
</div>

<Tabs>
	<div class="flex mx-3 space-x-1.5">
		<Tab>All</Tab>
		<Tab>Income</Tab>
		<Tab>Expense</Tab>
		<Tab>Transfer</Tab>
	</div>

	<TabPanel>
		<div class="max-h-80 flex flex-col overflow-y-auto">
			<Records recordType="all" />
		</div>
	</TabPanel>

	<TabPanel>
		<div class="max-h-80 flex flex-col overflow-y-auto">
			<Records recordType="income" />
		</div>
	</TabPanel>

	<TabPanel>
		<div class="max-h-80 flex flex-col overflow-y-auto">
			<Records recordType="expense" />
		</div>
	</TabPanel>
	<TabPanel>
		<div class="max-h-80 flex flex-col overflow-y-auto">
			<Records recordType="transfer" />
		</div>
	</TabPanel>
</Tabs>

<style>
	::-webkit-scrollbar {
		width: 0px;
	}

	::-webkit-scrollbar-track {
		background: #ffffff00;
	}

	::-webkit-scrollbar-thumb {
		background: #e3e3e300;
		border-radius: 10px;
	}
</style>
