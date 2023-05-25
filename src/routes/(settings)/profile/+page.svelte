<script>
	// @ts-nocheck

	import SettingsNav from '../../../components/SettingsNav.svelte';
	import Textfield from '../../../components/Textfield.svelte';
	import { updateProfile } from '../../../server/routes/settingsAPI';
	import { authStore } from '../../../server/stores/stores';
	import { goto } from '$app/navigation';

	let name = '';
	let email = '';
	let password = '';

	const submit = async () => {
		try {
			let check = await updateProfile(name, email, password, $authStore.user.uid).then(val => val);
			if (!check) {
				throw new Error("Update unsuccessful");
			}
			alert("Update successful");
			goto("/menu");
		} catch (error) {
			alert(error.message);
		}
	};

	const redirect = () => {
		goto('/login');
	};
</script>
{#if $authStore}
	<SettingsNav redirect="menu">Profile</SettingsNav>

	<div class="my-14"> 
		<form>
			<div class="mx-7 mb-2">
				<Textfield type="text" id="name" bind:value={name}>Name</Textfield>
			</div>
			<div class="mx-7 mb-2">
				<Textfield type="email" id="email" bind:value={email}>Email</Textfield>
			</div>
			<div class="mx-7 mb-64">
				<Textfield type="password" id="password" bind:value={password}>Password</Textfield>
			</div>
			<div class="flex flex-col items-center mb-5">
				<button
					on:click={submit}
					class="text-header5 bg-primary px-4 text-center text-white py-2 font-semibold rounded-full font-primary hover:opacity-90">
					Update
				</button>
			</div>
		</form>
	</div>
{:else}
	<div on:load={redirect()} />
{/if}