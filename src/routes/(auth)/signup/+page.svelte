<script lang="ts">
	import { signUp } from '$api/auth';
	import Loader from '$components/Loader.svelte';
	import Textfield from '$components/Textfield.svelte';

	let isLoading = false;
	let name = '';
	let email = '';
	let password = '';
	let message = '';

	const submit = async () => {
		isLoading = true;
		try {
			const errorMessage = await signUp(name, email, password);
			if (errorMessage === '') {
				console.log('User successfully created.');
				message = '';
			} else {
				console.log('error:', errorMessage);
				message = errorMessage;
			}
		} catch (error) {
			console.log('Signup process failed.');
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
	<div class="text-header2 text-agray-700 mx-7 font-semibold font-primary mb-5">Sign Up</div>
	<form class="signup">
		<div class="mx-7 mb-2">
			<Textfield type="text" bind:value={name} id="name">Name</Textfield>
		</div>
		<div class="mx-7 mb-2">
			<Textfield type="email" bind:value={email} id="email">Email</Textfield>
		</div>
		<div class="mx-7 mb-64">
			<Textfield type="password" bind:value={password} id="password">Password</Textfield>
			<span class="text-xs text-secondary font-semibold">{message}</span>
		</div>
		<div class="flex flex-col items-center mb-5">
			<button
				on:click={submit}
				class="text-header5 bg-primary w-11/12 text-center text-white py-3 font-semibold rounded-lg font-primary hover:opacity-90"
			>
				{#if isLoading}
					<Loader />
				{:else}
					Create Account
				{/if}
			</button>
		</div>
	</form>

	<div class="mx-7 flex">
		<div class="text-xs text-agray-500 font-semibold">Already have an account?</div>
		<a href="/login" class="text-xs mx-1 text-primary font-semibold hover:underline">Log In</a>
	</div>
</div>
