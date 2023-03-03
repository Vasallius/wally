<script>
	import { onMount } from 'svelte';
	import Logo from '/static/Logo.png';
	// let magic = "static/Logo.png"
	// @ts-nocheck

	let loggedIn = false;
	let username = 'test';
	let password = 'test';
	const clicked = async () => {
		await fetch('http://127.0.0.1:3002/listdatabases', {
			method: 'GET',
			headers: {
				'Content-type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((data) => {
				data.forEach((/** @type {string} */ val) => {
					console.log(val);
				});
			});
	};

	const submit = async () => {
		let body = { username, password };
		console.log(body);
		await fetch('http://127.0.0.1:3002/login', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(body)
		})
			.then((res) => res.json())
			.then((dat) => {
				if (dat !== null) {
					loggedIn = !loggedIn;
					localStorage.setItem('loggedIn', 'true');
					localStorage.setItem('userID', dat);
				}
			});
	};

	const logout = () => {
		loggedIn = !loggedIn;
		localStorage.setItem('loggedIn', 'false');
		localStorage.removeItem('loggedIn');
		localStorage.removeItem('userID');
	};
</script>

<div>
	<div>
		<div class="mx-auto w-36 h-36 bg-light-green mb-36 rounded-full">
			<img class= "w-36 h-36" src="/Logo.svg" alt="background" />
		</div>
		<div class="text-header2 text-agray-700 mx-7 font-semibold font-primary mb-5">Welcome to Wally!</div>
		<div class="text-xs text-agray-600 mx-7 mb-5 font-normal font-primary" />
		<div>
			<div class="flex flex-col items-center mb-9 mx-7">
				<button
					class="text-header5 bg-primary w-full text-center text-white py-3 font-semibold rounded-lg font-primary hover:opacity-90"
				>
						<a href="/signup">Sign up with email</a>
				</button>
				<div class="mx-7 text-xs text-agray-500 width-screen my-2 text-center">or</div>
				<button
					class="text-header5 text-agray-600 bg-agray-300 w-full text-center py-3 font-semibold rounded-lg font-primary hover:opacity-80"
				>
					<a href="/">Continue with Google</a>
				</button>
			</div>
		</div>
		<div class="mx-7 flex">
			<div class="text-xs text-agray-500 font-semibold">Already have an account?</div>
			<a href="/login" class="text-xs mx-1 text-primary font-semibold hover:underline">Log In</a>
		</div>
	</div>
</div>
