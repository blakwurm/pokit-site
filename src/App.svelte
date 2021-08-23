<script lang="ts">
	import { onMount } from 'svelte';
	import type init from './pokittypes/init'
	import type { PokitOS } from './pokittypes/pokit';
	import Clasp from './Clasp.svelte'

	// If we have this, then we have the world
	let pokit: PokitOS
	
	// The kickoff function that tells the engine that
	// it can go from loaded and ready to running
	let kickoff: () => Promise<void>

	// Our signal that the clasp button has been pressed.
	// If a truthy answer is passed in as a prop, we
	// act as though the clasp is pressed as soon as it
	// is able
	export let activated = false

	// Reference to the provided canvas element
	let canvas: HTMLCanvasElement

	// Handle initialization after the component
	// is fully mounted and everything is loaded. 
	// We do it here because the canvas (which the engine
	// requires) is not yet loaded before this point
	onMount(async ()=>{
		// Get the init function's namespace
		let initns: any = await import('/pokit/init.js')
		// and the function itself
		let pokitinit = initns.default
		// Run the init, which returns us two
		// different things: the pokitOS object,
		// and a function that tells the engine that
		// it's ready to go from ready to running
		let [one, two] = await pokitinit({canvas})
		pokit = one as PokitOS
		kickoff = two as () => Promise<void>
		// If the activated variable is already
		// set to truthy, it means that we
		// want to press that button for the user, like,
		// right away
		if (activated) {
			clasp_button_press()
		}
	}) 

	async function clasp_button_press() {
		// We only want to do this if the kickoff
		// variable is set, otherwise this is a no-op
		if (kickoff) {
			// We set the 'activated' variable to truth,
			// signaling to the app that it should
			// hide the clasp and take input and whatnot
			activated=true
			// Run the kickoff function, bringing the
			// engine from 'ready' to 'running'
			kickoff()
		}
	}

</script>

<!-- <div id='clasp-top' class:hidden={activated}>
	<button class:active={kickoff} on:click="{clasp_button_press}">Y</button>
</div>
<div id='clasp-bottom' class:hidden={activated}></div> -->
<main>
	<Clasp kickoff={clasp_button_press} bind:activated></Clasp>
	<canvas width=320 height=320 bind:this={canvas}></canvas>
</main>

<style>
	main {
		position:absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		text-align: center;
		padding: 0;
		margin: 0;
	}
	canvas {
		position: absolute;
		top: 0;
		left: calc(50vw - 160px);
		border: 3px double black;
	}
	/* #clasp-top, #clasp-bottom {
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
	} */

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