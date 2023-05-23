<script>
	import SettingsNav from '../../../components/SettingsNav.svelte';
	import Textfield from '../../../components/Textfield.svelte';

	export const name = 'profile';

	let username = '';
	let fullname = '';
	let email = '';
	let password = '';

	const submit = async () => {
		const body = { username, fullname, email, password };
		await fetch('http://127.0.0.1:3002/signup', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(body)
		})
			.then((res) => res.json())
			.then((returnValue) => {
				console.log(returnValue);
			});
	};
</script>

<SettingsNav redirect="menu">Profile</SettingsNav>

<div class= "bg-light-green"> 
	<form>
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
				class="text-header5 bg-primary px-4 text-center text-white py-2 font-semibold rounded-full font-primary hover:opacity-90"
			>
				Update
			</button>
		</div>
	</form>
</div>
