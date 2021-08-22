<script lang="ts">
	import { onMount } from 'svelte';
	import type init from './pokittypes/init'
	import type { PokitOS } from './pokittypes/pokit';
	export let name: string;
	export let pokitinit: typeof init

	let pokit: PokitOS
	
	let kickoff: () => Promise<void>
	let activated = false

	let canvas: HTMLCanvasElement

	console.log(pokitinit)
	let initret = pokitinit({canvas})

	onMount(async ()=>{
		let [one, two] = await pokitinit({canvas})
		pokit = one as PokitOS
		kickoff = two as () => Promise<void>
	}) 

	async function clasp_button_press() {
		if (kickoff) {
			activated=true
			kickoff()
		}
	}

</script>

<div id='clasp-top' class:hidden={activated}>
	<button class:active={kickoff} on:click="{clasp_button_press}">Y</button>
</div>
<div id='clasp-bottom' class:hidden={activated}></div>
<main>
	<canvas width=320 height=320 bind:this={canvas}></canvas>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
	#clasp-top, #clasp-bottom {
		position: fixed;
		width: 100%;
		background-color: transparent;
		background-image: url('../img/clasp.svg');
		background-repeat: no-repeat;
		background-size: cover;
		z-index: 1000;
  		transition: top 1s, bottom 1s, left 1s, right 1s;
	}
	#clasp-top {
		top: 0;
		right: 0;
		left: 0;
		bottom: 45vh;
		background-position: bottom;
		z-index: 2100;
	}
	#clasp-top.hidden {
		top: -50vh;
		bottom: 100vh;
	}
	#clasp-bottom {
		top:14vh;
		right:0;
		left: 0;
		bottom: 0;
		background-position: top;
	}
	#clasp-bottom.hidden {
		top: 100vh;
		bottom: -14vh;
	}
	#clasp-top button {
		position: relative;
		top: 25vh;
		left: 40vw;
		width: 20vw;
		height: 20vw;
		background-image: url('../img/button_red.svg');
		background-color: transparent;
		background-size: contain;
		background-repeat: no-repeat;
		border: none;
		color: transparent;
	}
	#clasp-top button.active {
		background-image: url('../img/button_green.svg');
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>