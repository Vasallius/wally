<script>
	import { X, WalletFill, CashStack, TagsFill } from 'svelte-bootstrap-icons';
	import { authStore } from '../server/stores/stores';
</script>

{#if $authStore}
	<main class="flex flex-col h-screen p-4 justify-between font-primary">
		<div>
			<header class="flex flex-row content-center justify-between">
				<a href="/profile" class="flex flex-row px-2 py-5 justify-between">
					<div class="flex flex-row gap-4">
						<div class="rounded">
							<img src="./Avatar.png" alt="profile" class="w-9 h-9" />
						</div>
						<div class="flex flex-col justify-center">
							<h1 class="text-normal font-semibold align-center">Swissnuff</h1>
						</div>
					</div>
				</a>
				<!--
				<div class="flex gap-2 items-center">
					<img class="w-10 h-10" src="/Logo.svg" alt="background" />
					<h1 class="text-xl font-bold tracking-widest">WALLY</h1>
				</div>-->
				<a href="/dashboard">
					<X fill="var(--agray-500)" height="2rem" width="2rem" />
				</a>
			</header>
			<hr />
			<a href="/wallet" class="flex flex-row px-2 pt-20 pb-2.5 justify-between">
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
			<a href="/category" class="flex flex-row px-2 py-2.5 justify-between">
				<div class="flex flex-row gap-4">
					<TagsFill fill="var(--primary)" width={20} height={20} />
					<div class="flex flex-col justify-center">
						<h1 class="text-sm text-agray-700 align-center">Category</h1>
					</div>
				</div>
			</a>
		</div>
		<div class="py-8">
			<hr />
			<!-- need to move -->
			<a href="/" class="text-sm text-agray-700 align-center">Log Out</a>
		</div>
	</main>
{:else}
	<div>You must be authenticated to access the menu.</div>
{/if}
