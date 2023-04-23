<script lang="ts">
	export let type: string;
	export let id: string;
	export let value: string;
</script>

<div class="text-field">
	<input type="text" {id} name={id} placeholder=" " required bind:value />
	<label for={id}>
		<slot />
	</label>
</div>

<style>
	.text-field {
		position: relative;
		margin: 1.2rem 0;
	}

	.text-field input {
		width: 100%;
		border: 1.5px solid gray;
		-webkit-transition: 0.5s;
		transition: 0.5s;
		outline: none;
		padding: 12px 20px 10px 10px;
		border-radius: 5px;
	}

	.text-field input:hover {
		border: 1.5px solid black;
	}

	.text-field input:focus {
		border: 1.5px solid var(--primary);
	}

	.text-field label {
		content: '';
		position: absolute;
		top: 14px;
		left: 10px;
		color: gray;
		font-size: 14px;
		pointer-events: none;
		transition: 0.2s ease all;
	}

	.text-field input:focus ~ label,
	.text-field input:not(:placeholder-shown) ~ label {
		font-size: 11px;
		top: -9px;
		transition: 0.2s ease all;
		-moz-transition: 0.2s ease all;
		-webkit-transition: 0.2s ease all;
		color: var(--primary);
		background-color: white;
		padding: 2px;
	}

	/* Change the white to any color */
	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus,
	input:-webkit-autofill:active {
		-webkit-box-shadow: 0 0 0 30px white inset !important;
	}
</style>
