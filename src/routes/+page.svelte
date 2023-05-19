<script>
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

<div class="flex flex-col h-screen max-w-md justify-center m-auto border-solid">
	<div class="mx-auto w-36 h-36 bg-light-green mb-36 rounded-full">
		<img class="w-36 h-36" src="/Logo.svg" alt="background" />
	</div>
	<div class="text-header2 text-agray-700 mx-7 font-semibold font-primary mb-5">
		Welcome to Wally!
	</div>
	<div class="text-xs text-agray-600 mx-7 mb-5 font-normal font-primary" />
	<div>
		<div class="flex flex-col items-center mb-2 mx-7">
			<a
				href="/signup"
				class="text-header5 bg-primary w-full text-center text-white py-3 font-semibold rounded-lg font-primary hover:opacity-90"
			>
				Sign up with email
			</a>
		</div>
	</div>
	<div>
		<div class="flex flex-col items-center mb-2 mx-7">
			<a
				href="/login"
				class="text-header5 border-2 border-primary w-full text-center text-primary py-3 font-semibold rounded-lg font-primary hover:bg-[#00C09F06]"
			>
				Log In
			</a>
		</div>
	</div>
</div>
