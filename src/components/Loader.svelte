<div class="spinner">
	<div />
	<div />
	<div />
	<div />
</div>

<style>
	.spinner {
		display: inline-block;
		position: relative;
		width: 1.2rem;
		height: 1.2rem;
	}
	.spinner div {
		box-sizing: border-box;
		display: block;
		position: absolute;
		width: 1.3rem;
		height: 1.3rem;
		border: 3px solid #fff;
		border-radius: 50%;
		animation: spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
		border-color: #fff transparent transparent transparent;
	}
	.spinner div:nth-child(1) {
		animation-delay: -0.45s;
	}
	.spinner div:nth-child(2) {
		animation-delay: -0.3s;
	}
	.spinner div:nth-child(3) {
		animation-delay: -0.15s;
	}
	@keyframes spinner {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
