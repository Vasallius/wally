<script lang="ts">
	import { BackspaceFill, Check, X } from 'svelte-bootstrap-icons';
	import Textfield from './Textfield.svelte';
	// <<START: Modal Pop Up>>
	export let isOpen = false;
	const closeModal = () => {
		isOpen = false;
	};
	// <<END: Modal Pop Up>>

	let numberInput = '';
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

	function isDuplicate(value: string | number) {
		if (operators.includes(numberInput.slice(-1)) && operators.includes(value.toString())) {
			return true; // Return true if last character is already an operator and new value is also an operator
		}
		return false; // For all other cases, return false to allow the input
	}

	function addToEquation(value: string | number) {
		if (value === 'backspace') {
			numberInput = numberInput.slice(0, -1);
		} else if (!isDuplicate(value)) {
			numberInput += value;
		}
	}

	const clear = () => {
		total = 0;
		numberInput = '';
	};

	function calculate() {
		if (numberInput !== '') {
			const resultValue = result();
			const roundedResult = resultValue.toFixed(2);
			const formattedResult = parseFloat(roundedResult).toString();
			numberInput = formattedResult;
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
	<form class="bg-black/40 flex flex-co h-screen m-auto max-w-md">
		<div class="bg-white rounded-lg h-fit w-11/12 m-auto p-6">
			<div class="flex justify-between m-auto mb-4">
				<button on:click={closeModal} class=""
					><X fill="var(--agray-600)" width={32} height={32} /></button
				>
				<button type="submit" on:click={closeModal} class="">
					<Check fill="var(--agray-600)" width={32} height={32} /></button
				>
			</div>
			<div class="radio-group mb-4">
				<input type="radio" id="income" name="transaction-type" value="income" checked />
				<label for="income" class="rounded-l-lg">Income</label>

				<input type="radio" id="expense" name="transaction-type" value="expense" />
				<label for="expense">Expense</label>

				<input type="radio" id="transfer" name="transaction-type" value="transfer" />
				<label for="transfer" class="rounded-r-lg">Transfer</label>
			</div>

			<!-- START OF CODE TO BE REVISED -->

			<div class="flex flex-row mb-4 mx-auto gap-2">
				<div class="flex grow rounded-lg border-2 border-sky-500">
					<img class="ml-4 mr-8" src="/WalletFill.svg" alt="background" />
					<div class="flex flex-col">
						<div class="text-super-sm font-primary font-semibold text-center ">Account</div>
						<div class="text-sm font-primary font-bold">WALLET</div>
					</div>
				</div>
				<div class="flex grow rounded-lg border-2 border-sky-500">
					<img class="ml-4 mr-2" src="/TagFill.svg" alt="background" />
					<div class="flex flex-col">
						<div class="text-super-sm font-primary font-semibold text-center ">Category</div>
						<div class="text-sm font-primary font-bold">Food & Drinks</div>
					</div>
				</div>
			</div>
			<!-- ====== REVISION ===== -->
			<div class="flex flex-row mb-4 mx-auto gap-2">
				<select
					class="flex grow rounded-lg border-2 border-primary py-2"
					placeholder=" "
					id="intervals-select"
				>
					<option value="Daily">Wallet</option>
					<option value="Daily">Wallet</option>
					<option value="Daily">Wallet</option>
				</select>
				<label for="intervals-select" class="text-super-sm font-primary font-semibold text-center">
					Account
				</label>
			</div>

			<!-- END OF CODE TO BE REVISED -->
			<div class="flex justify-between mx-auto border-b-2 pb-6">
				<div class="font-primary text-primary font-normal text-6xl">+</div>
				<div class="flex">
					<!-- svelte-ignore a11y-autofocus -->
					<input
						class="font-primary font-normal text-5xl self-end focus:outline-none text-right w-full "
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
					/>
					<div class="self-end p-[6px]">PHP</div>
				</div>
			</div>

			<div class="keypad mx-auto py-6">
				<button on:click={clear}>C</button>
				<button on:click={() => addToEquation('**')}>x<sup>□</sup></button>
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
		background-color: #f2f2f2;
		color: #666;
		font-size: 16px;
		font-weight: bold;
		cursor: pointer;
	}

	.radio-group input[type='radio']:checked + label {
		background-color: var(--primary);
		color: #fff;
	}
</style>
