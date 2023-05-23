<script>
	// @ts-nocheck
	// @ts-ignore
	export let redirect;
</script>

<div class="bg-primary flex flex-row gap-1">
	<a href="/{redirect}" class="m-3">
		<img class="w-10 h-10" src="/ArrowLeftShortWhite.svg" alt="background" />
	</a>
	<h1 class="text-white text-xl font-semibold my-auto"><slot /></h1>
</div>
