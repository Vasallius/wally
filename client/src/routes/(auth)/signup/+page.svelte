<script>
	// @ts-nocheck

	import Textfield from '../../../components/Textfield.svelte';
	import { signUp } from '../../../server/index.js';
	import { goto } from '$app/navigation';
	import Loader from '../../../components/Loader.svelte';
	let isLoading = false;

	const submit = () => {
		isLoading = true;
		try {
			// @ts-ignore
			signUp(
				document.querySelector('.signup').name.value,
				document.querySelector('.signup').email.value,
				document.querySelector('.signup').password.value
			);
			console.log('User succesfully created.');
		} catch (error) {
			console.log('Signup process faield.');
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
			<Textfield type="text" id="name">Name</Textfield>
		</div>
		<div class="mx-7 mb-2">
			<Textfield type="email" id="email">Email</Textfield>
		</div>
		<div class="mx-7 mb-64">
			<Textfield type="password" id="password">Password</Textfield>
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
