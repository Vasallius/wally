<script>
    export let isOpen = false;
    export let label = '';
    export let budget = 0;
    export let intervals = '';
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(`Label: ${label}`);
      console.log(`Budget: ${budget}`);
      console.log(`Intervals: ${intervals}`);
      closeModal();
    };
  
    const closeModal = () => {
      isOpen = false;
    };
  </script>
  
  <!-- need - ayusin itsura ng input fields --> 

  {#if isOpen}
    <div class="flex justify-between bg-agray-50 text-agray-600 text-base font-semibold" >
      <div class="flex flex-col">
        <form on:submit={handleSubmit} class="flex flex-col">
            <div>  
                <label for="label-input">Label:</label>
                <input type="text" id="label-input" bind:value={label} />
            </div>
            <div>
                <label for="budget-input">Budget:</label>
                <input type="number" id="budget-input" bind:value={budget} />
            </div>
            <div>
                <label for="intervals-select">Intervals:</label>
                <select id="intervals-select" bind:value={intervals}>
                    <option value="">Select an interval</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                </select>
            </div>
            <div>
                <button type="submit">Save</button>
            </div>
        </form>
        <div> 
            <button on:click={closeModal}>Close</button>
        </div>
      </div>
    </div>
  {/if}