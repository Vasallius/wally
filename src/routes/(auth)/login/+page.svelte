<script>
	// @ts-nocheck
	import Loader from '$components/Loader.svelte';
	import Textfield from '$components/Textfield.svelte';
	import { logIn } from '../../../server';

	let message = '';
	let isLoading = false;
	let email = '';
	let password = '';

	const login = async () => {
		isLoading = true;

		try {
			const errorMessage = await logIn(email, password);

			if (errorMessage === '') {
				console.log('Log in successful.');
				message = '';
			} else {
				console.log('error:', errorMessage);
				message = errorMessage;
			}
		} catch (error) {
			console.log('Login Failed');
		}

		isLoading = false;
	};
</script>

<div>
	<a href="/">
		<div class="mx-7 w-12 h-12 bg-light-green mb-8 rounded-full">
			<img
				class="w-12 h-12 transition ease-in-out hover:-translate-x-0.5 duration-100"
				src="/ArrowLeftShort.svg"
				alt="background"
			/>
		</div>
	</a>
	<div class="text-header2 text-agray-700 mx-7 font-semibold font-primary mb-5">Log In</div>
	<form class="login">
		<div class="mx-7 mb-2">
			<Textfield type="email" id="email" bind:value={email}>Email</Textfield>
		</div>
		<div class="mx-7 mb-64">
			<Textfield type="password" id="password" bind:value={password}>Password</Textfield>
			<span class="text-xs text-secondary font-semibold">{message}</span>
		</div>

		<div class="flex flex-col items-center mb-5">
			<button
				on:click={login}
				class="text-header5 bg-primary w-11/12 text-center text-white py-3 font-semibold rounded-lg font-primary hover:opacity-90"
			>
				{#if isLoading}
					<Loader />
				{:else}
					Log in
				{/if}
			</button>
		</div>
	</form>

	<div class="mx-7 flex">
		<div class="text-xs text-agray-500 font-semibold">Don't have an account yet?</div>
		<a href="/signup" class="text-xs mx-1 text-primary font-semibold hover:underline">Sign Up</a>
	</div>
</div>
