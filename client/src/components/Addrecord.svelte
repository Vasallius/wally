<script lang="ts">
	// <<START: Modal Pop Up>>
	export let isOpen = false;
	export let label = '';

	const handleSubmit = (event: any) => {
		event.preventDefault();
		console.log(`Label: ${label}`);
		closeModal();
	};

	const closeModal = () => {
		isOpen = false;
	};

	// <<END: Modal Pop Up>>
	import { BackspaceFill, Check, X } from 'svelte-bootstrap-icons';

	let numberInput: string = '';
	let total: number = 0;

	function addToEquation(value: any) {
		if (value === 'backspace') {
			numberInput = numberInput.slice(0, -1);
		} else if (value === '.') {
			// prevent adding multiple decimal points
			if (numberInput.slice(-1) !== '.') {
				numberInput += '.';
			}
		} else {
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
		if (parseInt(numberInput.slice(-1), 10)) {
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

	function onBlur(this: HTMLInputElement) {
		this.focus();
	}

	// reactive values
	$: if (numberInput !== '' && parseInt(numberInput.slice(-1), 10) && numberInput != result()) {
		total = result().toString();
	}
</script>

{#if isOpen}
	<div class="bg-black/40 flex flex-col h-screen m-auto max-w-md">
		<div class="bg-white rounded-lg h-fit w-11/12 m-auto p-5">
			<div class="flex justify-between w-11/12 m-auto ">
				<button on:click={closeModal} class="bg-transparent"
					><X fill="var(--agray-600)" width={32} height={32} /></button
				>
				<button on:click={closeModal} class="bg-transparent">
					<Check fill="var(--agray-600)" width={32} height={32} /></button
				>
			</div>
			<div class="flex flex-row w-11/12 mx-auto">
				<a
					href="/"
					class="flex grow align-center text-header5 font-semibold bg-primary rounded-l-lg"
				>
					Income
				</a>
				<a href="/" class="flex grow align-center text-header5 font-semibold bg-agray-300"
					>Expense</a
				>
				<a
					href="/"
					class="flex grow align-center text-header5 font-semibold bg-agray-300 rounded-r-lg"
				>
					Tracker
				</a>
			</div>
			<div class="flex flex-row w-11/12 mb-4 mx-auto">
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

			<div class="flex justify-between w-11/12 mx-auto border-b-2 pb-6">
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
							}
						}}
					/>
					<div class="self-end p-[6px]">PHP</div>
				</div>
			</div>

			<div class="keypad w-11/12 mx-auto py-6">
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
	</div>
{/if}

<style>
	.keypad {
		display: grid;
		grid-template-columns: repeat(4, 25%);
		grid-template-rows: repeat(5, 20%);
	}

	.keypad button {
		grid-column: span 1;
		padding: 1rem 0.8rem;
		background-color: var(--agray-100);
		border-radius: 10px;
		margin: 5px;
		font-size: 16px;
	}
	button:active {
		background-color: var(--agray-400) !important;
	}
</style>
