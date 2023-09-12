<script>
	import { authStore } from '$stores/stores';
	import { CashStack, PersonFill, TagsFill, WalletFill, X } from 'svelte-bootstrap-icons';
	import { getName } from '../server/routes/dashboard_routes/dashboardCardsAPI';

	export let user;

	async function fetchUser() {
		return getName(user.uid);
	}

	let promise = fetchUser();
</script>

{#if $authStore}
	<div class="bg-primary flex flex-row justify-between">
		<h1 class="text-white text-xl font-semibold my-auto pl-8">Menu</h1>
		<a href="/dashboard" class="my-3 pr-5">
			<X fill="white" height="2.5rem" width="2.5rem" />
		</a>
	</div>
	<main class="flex flex-col h-screen justify-between font-primary">
		<div>
			<a
				href="/profile"
				class="flex flex-row content-center justify-between items-center border-b px-2 py-6 hover:bg-agray-50"
			>
				<div class="flex flex-row gap-4">
					<div class="rounded pl-2">
						<img src="./Avatar.png" alt="profile" class="w-10 h-10" />
					</div>
					<div class="flex flex-col justify-center">
						{#await promise then user}
							<h1 class="text-lg text-agray-700 font-semibold align-center">{user}</h1>
						{/await}
					</div>
				</div>
			</a>
			<a
				href="/profile"
				class="flex flex-row pl-4 pr-2 mt-16 py-4 justify-between hover:bg-agray-50"
			>
				<div class="flex flex-row gap-4">
					<PersonFill fill="var(--primary)" width={20} height={20} />
					<div class="flex flex-col justify-center">
						<h1 class="text-sm font-medium text-agray-700 align-center hover:opacity-90">
							Profile
						</h1>
					</div>
				</div>
			</a>
			<a href="/wallet" class="flex flex-row pl-4 pr-2 py-4 justify-between hover:bg-agray-50">
				<div class="flex flex-row gap-4">
					<WalletFill fill="var(--primary)" width={20} height={20} />
					<div class="flex flex-col justify-center">
						<h1 class="text-sm font-medium text-agray-700 align-center hover:opacity-90">Wallet</h1>
					</div>
				</div>
			</a>
			<a href="/budget" class="flex flex-row pl-4 pr-2 py-4 justify-between hover:bg-agray-50">
				<div class="flex flex-row gap-4">
					<CashStack fill="var(--primary)" width={20} height={20} />
					<div class="flex flex-col justify-center">
						<h1 class="text-sm font-medium text-agray-700 align-center hover:opacity-90">Budget</h1>
					</div>
				</div>
			</a>
			<a href="/category" class="flex flex-row pl-4 pr-2 py-4 justify-between hover:bg-agray-50">
				<div class="flex flex-row gap-4">
					<TagsFill fill="var(--primary)" width={20} height={20} />
					<div class="flex flex-col justify-center">
						<h1 class="text-sm font-medium text-agray-700 align-center hover:opacity-90">
							Category
						</h1>
					</div>
				</div>
			</a>
		</div>
		<a
			href="/"
			class="text-base font-semibold text-agray-700 align-center border-t pt-5 pb-10 pl-4 hover:bg-agray-50"
			>Log Out</a
		>
	</main>
{:else}
	<div>You must be authenticated to access the menu.</div>
{/if}
