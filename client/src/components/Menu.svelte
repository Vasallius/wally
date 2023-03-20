<script>
	import { X, WalletFill, CashStack, TagsFill } from 'svelte-bootstrap-icons';
</script>

<main class="flex flex-col h-screen p-4">
	<header class="flex flex-row content-center justify-between">
		<div class="flex gap-2 items-center">
			<img class="w-10 h-10" src="/Logo.svg" alt="background" />
			<h1 class="text-xl font-bold tracking-widest">WALLY</h1>
		</div>
		<a href="/dashboard">
			<X fill="var(--agray-500)" height="2rem" width="2rem" />
		</a>
	</header>
	<a href="/profile" class="flex flex-row px-2 py-3 justify-between">
		<div class="flex flex-row gap-4">
			<div class="rounded">
				<img src="./Avatar.png" alt="profile" width={26} height={26} />
			</div>
			<div class="flex flex-col justify-center">
				<h1 class="text-sm font-semibold text-agray-600 align-center">Swissnuff</h1>
			</div>
		</div>
	</a>
	<a href="/wallet" class="flex flex-row px-2 py-2 justify-between">
		<div class="flex flex-row gap-4">
			<WalletFill fill="var(--primary)" width={20} height={20} />
			<div class="flex flex-col justify-center">
				<h1 class="text-sm text-agray-700 align-center">Wallet</h1>
			</div>
		</div>
	</a>
	<a href="/budget" class="flex flex-row px-2 py-2 justify-between">
		<div class="flex flex-row gap-4">
			<CashStack fill="var(--primary)" width={20} height={20} />
			<div class="flex flex-col justify-center">
				<h1 class="text-sm text-agray-700 align-center">Budget</h1>
			</div>
		</div>
	</a>
	<a href="/category" class="flex flex-row px-2 py-2 justify-between">
		<div class="flex flex-row gap-4">
			<TagsFill fill="var(--primary)" width={20} height={20} />
			<div class="flex flex-col justify-center">
				<h1 class="text-sm text-agray-700 align-center">Category</h1>
			</div>
		</div>
	</a>
</main>

<style>
</style>
