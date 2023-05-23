<script lang="ts">
	// @ts-nocheck
	import {
		authStore,
		recordsStore,
		walletStores,
		monthlySummaryStores,
		budgetStores
	} from '../server/stores/stores.js';
	import { BackspaceFill, Check, X } from 'svelte-bootstrap-icons';
	import DropdownWallet from './DropdownWallet.svelte';
	import DropdownCategory from './DropdownCategory.svelte';
	import { addRecord } from '../server';
	import {
		updateWallets,
		recordErrorCheck,
		updateRecords
	} from '../server/routes/dashboard_routes/dashboardCardsAPI.js';
	import {
		sumRecords,
		sumTransferFrom,
		sumTransferTo
	} from '../server/routes/dashboard_routes/dashboardCardsAPI.js';
	import { getBudgets } from '../server/routes/budgetsAPI.js';
	import { updateBudgets } from '../server/routes/budgetsAPI.js';

	let transactionType = 'income';
	let sign = '+';
	let color = 'primary';
	let labelName = 'account';
	let selectedWallet = '';
	let selectedWallet2 = '';
	let selectedCategory = '';

	function changeTransactionType(event: Event) {
		const target = event.currentTarget as HTMLInputElement;
		transactionType = target.value;

		if (transactionType === 'expense') {
			sign = '-';
			color = 'secondary';
			labelName = 'account';
		} else if (transactionType === 'transfer') {
			sign = '';
			labelName = 'from account';
		} else {
			sign = '+';
			color = 'primary';
			labelName = 'account';
		}
	}

	// <<END: Handling Different Transaction>>

	// <<START: Handling the calculator>>

	let numberInput = '0';
	let total = 0;

	const allowedKeys = [
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'0',
		'*',
		'+',
		'-',
		'^',
		'.',
		'%',
		'^',
		'/',
		'Backspace'
	];

	const operators = ['*', '+', '-', '^', '.', '%', '^', '/'];

	export let isOpen = false;
	const closeModal = () => {
		isOpen = false;
		numberInput = '0';
		total = 0;
	};

	// This function handles when the plus button is clicked
	const handleSubmit = async () => {
		let budgets = await getBudgets($authStore.user.uid);
		budgetStores.set(budgets);
		calculate();
		isOpen = false;
		let records = $recordsStore;
		let newRecord = {
			amount: parseInt(numberInput),
			category: selectedCategory,
			name: 'magic', // UNUSED FIELD LMFAO
			recordType: transactionType,
			wallet: selectedWallet,
			wallet2: selectedWallet2
		};
		let check = recordErrorCheck(newRecord, $walletStores);
		if (!check[0]) {
			alert(check[1]);
		} else {
			records = await addRecord($authStore.user.uid, newRecord);
			recordsStore.set(records);
			updateRecords($authStore.user.uid, records);
			if (transactionType === 'income') {
				const updatedWallets = $walletStores.map((wallet) => {
					if (wallet.name === selectedWallet) {
						let income = sumRecords($recordsStore, 'income', selectedWallet);
						let expenses = sumRecords($recordsStore, 'expense', selectedWallet);
						let transferout = sumTransferFrom($recordsStore, selectedWallet);
						let transferin = sumTransferTo($recordsStore, selectedWallet);
						let initial = wallet.initial;
						monthlySummaryStores.set([income, expenses, transferin, transferout, initial]);
						let newBalance = wallet.initial + income - expenses - transferout + transferin;
						return {
							...wallet,
							balance: newBalance
						};
					}
					return wallet;
				});
				walletStores.set(updatedWallets);
				updateWallets($authStore.user.uid, updatedWallets);
			} else if (transactionType === 'expense') {
				const updatedWallets = $walletStores.map((wallet) => {
					if (wallet.name === selectedWallet) {
						let income = sumRecords($recordsStore, 'income', selectedWallet);
						let expenses = sumRecords($recordsStore, 'expense', selectedWallet);
						let transferout = sumTransferFrom($recordsStore, selectedWallet);
						let transferin = sumTransferTo($recordsStore, selectedWallet);
						let initial = wallet.initial;
						monthlySummaryStores.set([income, expenses, transferin, transferout, initial]);
						let newBalance = wallet.initial + income - expenses - transferout + transferin;
						return {
							...wallet,
							balance: newBalance
						};
					}
					return wallet;
				});
				walletStores.set(updatedWallets);
				updateWallets($authStore.user.uid, updatedWallets);
				const updatedBudgets = $budgetStores.DayRecords.map((budget) => {
					if (budget.title == selectedCategory) {
						return { ...budget, spent: (budget.spent += parseInt(numberInput)) };
					}
					return budget;
				});
				updateBudgets($authStore.user.uid, $budgetStores);
				budgetStores.set({ ...$budgetStores, DayRecords: updatedBudgets });
			} else {
				const updatedWallets = $walletStores.map((wallet) => {
					if (wallet.name === selectedWallet) {
						let income = sumRecords($recordsStore, 'income', selectedWallet);
						let expenses = sumRecords($recordsStore, 'expense', selectedWallet);
						let transferout = sumTransferFrom($recordsStore, selectedWallet);
						let transferin = sumTransferTo($recordsStore, selectedWallet);
						let initial = wallet.initial;
						monthlySummaryStores.set([income, expenses, transferin, transferout, initial]);
						let newBalance = wallet.initial + income - expenses - transferout + transferin;
						return {
							...wallet,
							balance: newBalance
						};
					} else if (wallet.name === selectedWallet2) {
						let income = sumRecords($recordsStore, 'income', selectedWallet2);
						let expenses = sumRecords($recordsStore, 'expense', selectedWallet2);
						let transferout = sumTransferFrom($recordsStore, selectedWallet2);
						let transferin = sumTransferTo($recordsStore, selectedWallet2);
						let initial = wallet.initial;
						monthlySummaryStores.set([income, expenses, transferin, transferout, initial]);
						let newBalance = wallet.initial + income - expenses - transferout + transferin;
						return {
							...wallet,
							balance: newBalance
						};
					}
					return wallet;
				});
				walletStores.set(updatedWallets);
				updateWallets($authStore.user.uid, updatedWallets);
			}
		}
	};

	function isDuplicate(value: string | number) {
		if (operators.includes(numberInput.slice(-1)) && operators.includes(value.toString())) {
			return true; // Return true if last character is already an operator and new value is also an operator
		}
		return false; // For all other cases, return false to allow the input
	}

	function addToEquation(value: string | number) {
		if (value === 'backspace') {
			numberInput = numberInput.slice(0, -1);
			if (numberInput === '') {
				numberInput = '0';
			}
		} else if (numberInput === '0') {
			numberInput = '' + value;
		} else if (!isDuplicate(value)) {
			numberInput += value;
		}
	}

	const clear = () => {
		total = 0;
		numberInput = '0';
	};

	function calculate() {
		if (numberInput !== '') {
			const resultValue = result();
			const roundedResult = resultValue.toFixed(2);
			const formattedResult = parseFloat(roundedResult).toString();
			numberInput = formattedResult;
		} else {
			numberInput = '0';
		}
	}

	// computed
	let result = () => {
		if (!isNaN(Number(numberInput.slice(-1)))) {
			let expr = numberInput;
			if (expr.includes('%')) {
				let exprParts = expr.split('%');
				let percentValue = parseFloat(exprParts[0]) / 100;
				expr = percentValue.toString() + exprParts.slice(1).join('');
			}
			return eval(expr);
		}
		return eval(numberInput.slice(0, -1));
	};

	// reactive values
	$: if (numberInput !== '' && !isNaN(Number(numberInput.slice(-1))) && numberInput != result()) {
		total = result().toString();
	}

	function onBlur(this: HTMLInputElement) {
		this.focus();
	}
</script>

{#if isOpen}
	<form class="bg-black/40 flex flex-co h-screen m-auto max-w-md fixed overflow-hidden">
		<div class="bg-white rounded-lg h-fit w-11/12 m-auto p-6">
			<!-- Modal header with close and submit buttons -->

			<div class="flex justify-between m-auto mb-4">
				<button on:click={closeModal} class=""
					><X fill="var(--agray-600)" width={32} height={32} /></button
				>
				<button type="submit" on:click={handleSubmit} class="">
					<Check fill="var(--agray-600)" width={32} height={32} /></button
				>
			</div>

			<!-- Radio group for selecting transaction type (Income, Expense, Transfer) -->

			<div class="radio-group mb-1">
				<input
					type="radio"
					id="income"
					name="transaction-type"
					value="income"
					class="peer/income"
					checked={transactionType === 'income'}
					on:change={changeTransactionType}
				/>
				<label
					class="bg-agray-300 text-agray-600 peer-checked/income:bg-primary peer-checked/income:text-white rounded-l-lg"
					for="income">Income</label
				>

				<input
					type="radio"
					id="expense"
					name="transaction-type"
					value="expense"
					class="peer/expense"
					checked={transactionType === 'expense'}
					on:change={changeTransactionType}
				/>
				<label
					class="bg-agray-300 text-agray-600 peer-checked/expense:bg-secondary peer-checked/expense:text-white"
					for="expense">Expense</label
				>

				<input
					type="radio"
					id="transfer"
					name="transaction-type"
					value="transfer"
					class="peer/transfer"
					checked={transactionType === 'transfer'}
					on:change={changeTransactionType}
				/>
				<label
					class="bg-agray-300 text-agray-600 peer-checked/transfer:bg-tertiary peer-checked/transfer:text-white rounded-r-lg"
					for="transfer">Transfer</label
				>
			</div>

			<!-- Group of dropdown menus for selecting a wallet and transaction type -->

			<div class="flex flex-row gap-2 mb-10">
				<DropdownWallet {labelName} bind:selectedWallet />
				{#if transactionType === 'transfer'}
					<DropdownWallet labelName="to account" bind:selectedWallet={selectedWallet2} />
				{/if}
				{#if !(transactionType === 'transfer')}
					<DropdownCategory bind:selectedCategory />
				{/if}
			</div>

			<div class="flex justify-between mx-auto border-b-2 pb-6">
				<div class="font-primary font-normal text-4xl text-{color}">
					{sign}
				</div>
				<div class="flex">
					<!-- svelte-ignore a11y-autofocus -->
					<input
						class="font-primary font-normal text-4xl self-end focus:outline-none text-right w-full"
						bind:value={numberInput}
						on:blur={onBlur}
						autofocus
						on:keydown={(event) => {
							if (event.key === 'Enter') {
								calculate();
							} else if (!allowedKeys.includes(event.key)) {
								event.preventDefault();
							} else {
								if (isDuplicate(event.key)) {
									event.preventDefault();
								}
							}
						}}
						inputmode="none"
					/>
					<div class="self-end p-[6px] text-sm">PHP</div>
				</div>
			</div>

			<!-- Keypad for inputting transaction amount -->

			<div class="keypad mx-auto py-6">
				<button on:click={clear}>C</button>
				<button on:click={() => addToEquation('**')}>x<sup>☐</sup></button>
				<button on:click={() => addToEquation('%')}>%</button>
				<button on:click={() => addToEquation('/')}>÷</button>

				<button on:click={() => addToEquation(7)}>7</button>
				<button on:click={() => addToEquation(8)}>8</button>
				<button on:click={() => addToEquation(9)}>9</button>
				<button on:click={() => addToEquation('*')}>x</button>

				<button on:click={() => addToEquation(4)}>4</button>
				<button on:click={() => addToEquation(5)}>5</button>
				<button on:click={() => addToEquation(6)}>6</button>
				<button on:click={() => addToEquation('-')}>-</button>

				<button on:click={() => addToEquation(1)}>1</button>
				<button on:click={() => addToEquation(2)}>2</button>
				<button on:click={() => addToEquation(3)}>3</button>
				<button on:click={() => addToEquation('+')}>+</button>

				<button on:click={() => addToEquation('.')}>.</button>
				<button on:click={() => addToEquation(0)}>0</button>
				<button on:click={() => addToEquation('backspace')}
					><BackspaceFill fill="var(--agray-600)" width={20} height={20} class="m-auto" /></button
				>

				<button on:click={() => calculate()}>=</button>
			</div>
		</div>
	</form>
{/if}

<style>
	/* ===== Keypad Styles 	=====*/
	.keypad {
		display: grid;
		grid-template-columns: repeat(4, 25%);
		grid-template-rows: repeat(5, 20%);
	}

	.keypad button {
		grid-column: span 1;
		padding: 1.3rem 1rem;
		background-color: var(--agray-100);
		border-radius: 10px;
		margin: 5px;
		font-size: 16px;
	}
	.keypad button:active {
		background-color: var(--agray-400) !important;
	}

	/* ===== Radio Buttons Style for Income, Expense, Transfer =====*/
	.radio-group {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.radio-group input[type='radio'] {
		display: none;
	}

	.radio-group label {
		display: inline-block;
		flex-grow: 1;
		text-align: center;
		padding: 5px 0;
		font-size: 16px;
		font-weight: bold;
		cursor: pointer;
	}
</style>
