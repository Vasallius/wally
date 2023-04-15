<script>
	let numberInput = '';
	let total = 0;

	function addToEquation(value) {
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
			numberInput = result().toString();
		}
	}

	// computed
	let result = () => {
		if (!isNaN(numberInput.slice(-1))) {
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
	$: if (numberInput !== '' && !isNaN(numberInput.slice(-1)) && numberInput != result()) {
		total = result().toString();
	}
</script>

<div class="flex flex-row w-11/12 mx-auto justify-between">
	<img src="/X-icon.png" alt="" />
	<img src="/check.png" alt="" />
</div>
<div class="flex flex-row w-11/12 mx-auto">
	<div class="py-3 px-6 text-header5 font-semibold bg-primary rounded-l-lg">Income</div>
	<div class="py-3 px-6 text-header5 font-semibold bg-agray-300">Expense</div>
	<div class="py-3 px-6 text-header5 font-semibold bg-agray-300 rounded-r-lg">Tracker</div>
</div>
<div class="flex flex-row w-11/12 mb-16 mx-auto">
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
	<div class="font-primary text-primary font-normal text-6xl self-end">+</div>
	<div class="flex ">
		<div class="font-primary font-normal text-5xl self-end">{numberInput}</div>
		<div class="self-end">PHP</div>
	</div>
</div>

<div class="keypad w-11/12 mx-auto py-6">
	<button on:click={clear}>C</button>
	<button on:click={clear}>()</button>
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
	<button on:click={() => addToEquation('backspace')}>backspace</button>
	<button on:click={() => addToEquation(0)}>0</button>
	<button on:click={() => calculate()}>=</button>
</div>

<style>
	.keypad {
		display: grid;
		grid-template-columns: repeat(4, 25%);
		grid-template-rows: repeat(5, 20%);
	}
	button {
		grid-column: span 1;
		padding: 1.3rem 1rem;
		background-color: var(--agray-100);
		border-radius: 10px;
		margin: 5px;
		font-size: 16px;
	}
	button:active {
		background-color: var(--agray-400) !important;
	}
</style>
