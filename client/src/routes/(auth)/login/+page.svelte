<script lang="ts">
	import Textfield from '../../../components/Textfield.svelte';
<<<<<<< HEAD
	import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
	import { initializeApp } from 'firebase/app';

=======
	import {
		getAuth,
		onAuthStateChanged,
		type User,
		signInWithEmailAndPassword
	} from 'firebase/auth';
	import { initializeApp } from 'firebase/app';
	import { onMount } from 'svelte';
>>>>>>> main
	let username = '';
	let fullname = '';
	let email = '';
	let password = '';
	let user: User | null;

	const firebaseConfig = {
		apiKey: 'AIzaSyDTLyLUaVgvIihRMDLOXypjqfBenGh2fQk',
		authDomain: 'wally-75d4e.firebaseapp.com',
		projectId: 'wally-75d4e',
		storageBucket: 'wally-75d4e.appspot.com',
		messagingSenderId: '518053974573',
		appId: '1:518053974573:web:8aa5410f6c4b98ffd75ea4'
	};
	const app = initializeApp(firebaseConfig);

	const login = () => {
		console.log('test');
		console.log('email and pass');
		console.log(email, password);
		const auth = getAuth(app);

		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				console.log(user);
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
			});
	};

	onMount(async () => {
		const auth = getAuth(app);
		onAuthStateChanged(auth, (newUser) => {
			user = newUser;
		});
	});
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
	<form>
		<div class="mx-7 mb-2">
			<Textfield bind:value={email} type="email" id="email">Email</Textfield>
		</div>
		<div class="mx-7 mb-64">
			<Textfield bind:value={password} type="password" id="password">Password</Textfield>
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
