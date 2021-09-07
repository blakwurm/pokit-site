<script lang="ts">
	import { onMount } from 'svelte';
	import type init from './pokittypes/init'
	import type { PokitOS } from './pokittypes/pokit';
	import Clasp from './Clasp.svelte'
	import Screen from './Screen.svelte'
	import Input from './Input.svelte'
	import Drawer from './Drawer.svelte'
	import {atomic_hue} from './sitesettings.js'

	console.log(atomic_hue)
	$: document.body.style.setProperty('--theme-hue', $atomic_hue+'deg')

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

	// Flag to let us know if the system is in error, which will
	// display the appropriate error lights etc
	export let is_error = false

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
	<Screen bind:activated bind:canvas bind:is_error></Screen>
	<Input bind:pokit={pokit}></Input>
	<Drawer></Drawer>
	<div id="backmask"></div>


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

	#backmask {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: hsla(0, 75%, 40%, 0.4);
		filter: hue-rotate(var(--theme-hue));
		backdrop-filter: blur(2px);
		z-index: 0;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>