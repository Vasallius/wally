<script>
	// @ts-nocheck

	import { authStore, budgetStores } from '$stores/stores';
	import { budgetErrorCheck, updateBudgets } from '../server/routes/budgetsAPI';

	export let isOpen = false;
	export let label = '';
	export let budget = 0;
	export let interval;

	const handleSubmit = async (event) => {
		let errorCheck = budgetErrorCheck(
			{ title: label, budget: budget },
			interval,
			$budgetStores,
			'edit'
		);
		event.preventDefault();
		if (!errorCheck[0]) {
			alert(errorCheck[1]);
		} else {
			if (interval == 'Daily') {
				let budgets = $budgetStores;
				let dailybudgets = budgets.DayRecords;
				dailybudgets.map((record) => {
					if (record.title == label) {
						return { ...record, budget: (record.budget = budget) };
					} else {
						return record;
					}
				});
				budgetStores.set({ ...$budgetStores, DayRecords: dailybudgets });
				updateBudgets($authStore.user.uid, $budgetStores);
			} else if (interval == 'Weekly') {
				let budgets = $budgetStores;
				let weeklybudgets = budgets.WeekRecords;
				weeklybudgets.map((record) => {
					if (record.title == label) {
						return { ...record, budget: (record.budget = budget) };
					} else {
						return record;
					}
				});
				budgetStores.set({ ...$budgetStores, WeekRecords: weeklybudgets });
				updateBudgets($authStore.user.uid, $budgetStores);
			} else {
				let budgets = $budgetStores;
				let monthlyBudgets = budgets.MonthRecords;
				monthlyBudgets.map((record) => {
					if (record.title == label) {
						return { ...record, budget: (record.budget = budget) };
					} else {
						return record;
					}
				});
				budgetStores.set({ ...$budgetStores, MonthRecords: monthlyBudgets });
				updateBudgets($authStore.user.uid, $budgetStores);
			}
			closeModal();
		}
	};

	const closeModal = () => {
		isOpen = false;
		label = '';
		budget = 0;
		interval = '';
	};
</script>

{#if isOpen}
	<div
		class="flex absolute top-0 min-h-full items-center bg-black/40 border border-x-1 border-black/40 border-r-transparent z-index-100 justify-center w-full sm:w-[448px] z-20"
	>
		<form
			on:submit={handleSubmit}
			class="flex flex-col gap-4 bg-white rounded-xl text-agray-700 text-base font-semibold py-10 px-10 mx-auto"
		>
			<h1>Edit Budget</h1>
			<div class="flex w-auto flex-col gap-6">
				<div class="relative h-10 w-48 min-w-[200px]">
					<input
						class="peer h-full w-full rounded-[7px] border border-agray-600 border-t-transparent bg-transparent px-3 py-2.5 font-primary text-sm
              font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-agray-600
              placeholder-shown:border-t-agray-600 focus:border-2 focus:border-teal-500 focus:border-t-transparent focus:outline-0
              disabled:border-0 disabled:bg-blue-gray-50"
						placeholder=" "
						type="number"
						id="budget-input"
						bind:value={budget}
					/>
					<label
						for="budget-input"
						class="before:content[' '] after:content[' '] font-normal pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px]
              font-primary leading-tight text-agray-700 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border
              before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-agray-600
              before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5
              after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-agray-600 after:transition-all
              peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-agray-700
              peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px]
              peer-focus:leading-tight peer-focus:text-teal-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2
              peer-focus:before:border-teal-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-teal-500
              peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent
              peer-disabled:peer-placeholder-shown:text-blue-gray-500"
					>
						Budget
					</label>
				</div>

				<div class="relative self-center flex flex-row font-normal justify-between w-full">
					<button
						on:click={closeModal}
						class="w-16 relative text-center text-white rounded-lg bg-agray-500 shadow-lg shadow-inherit hover:opacity-70"
					>
						Cancel
					</button>
					<button
						type="submit"
						class="pb-0.5 w-16 relative text-center text-white bg-primary rounded-lg shadow-lg shadow-inherit hover:opacity-70"
					>
						Save
					</button>
				</div>
			</div>
		</form>
	</div>
{/if}
