<script>
  import Tabs from './Tabs.svelte';
	import TabPanel from './TabPanel.svelte';
	import Tab from './Tab.svelte';
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
      <div class="max-h-80 flex flex-col overflow-y-scroll">
      </div>
    </TabPanel>

    <TabPanel>
      <div class="max-h-80 flex flex-col overflow-y-auto">
      </div>
    </TabPanel>

    <TabPanel>
      <div class="max-h-80 flex flex-col overflow-y-auto">
      </div>
    </TabPanel>
    <TabPanel>
      <div class="max-h-80 flex flex-col overflow-y-auto">
      </div>
    </TabPanel>
  </Tabs>

  <style>
    ::-webkit-scrollbar {
        width: 4px;
    }
  
    ::-webkit-scrollbar-track { 
        background: #ffffff00;
    }
  
    ::-webkit-scrollbar-thumb { 
        background: #E3E3E3;
      border-radius:10px;
    }
  </style>