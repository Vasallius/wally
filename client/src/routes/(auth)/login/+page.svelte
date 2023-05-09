<script>
	// @ts-nocheck

	import Textfield from '../../../components/Textfield.svelte';
	import { logIn } from '../../../server';
	let message = '';

	const login = async () => {
		try {
			let x = document.querySelector('.login').email.value;
			let y = document.querySelector('.login').password.value;

			const errorMessage = await logIn(x, y); // Add 'await' here
			if (errorMessage === '') {
				console.log('Log in succesful.');
			} else {
				console.log('error:', errorMessage);
				message = errorMessage;
			}
		} catch (error) {
			console.log('error');
		}
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
			<Textfield type="email" id="email">Email</Textfield>
		</div>
		<div class="mx-7 mb-64">
			<Textfield type="password" id="password">Password</Textfield>
			<span class="text-xs text-secondary font-semibold">{message}</span>
		</div>

		<div class="flex flex-col items-center mb-5">
			<button
				on:click={login}
				class="text-header5 bg-primary w-11/12 text-center text-white py-3 font-semibold rounded-lg font-primary hover:opacity-90"
			>
				Log in
			</button>
		</div>
	</form>

	<div class="mx-7 flex">
		<div class="text-xs text-agray-500 font-semibold">Don't have an account yet?</div>
		<a href="/signup" class="text-xs mx-1 text-primary font-semibold hover:underline">Sign Up</a>
	</div>
</div>
