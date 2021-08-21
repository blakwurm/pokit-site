<script lang="ts">
	import { onMount } from 'svelte';
	import type init from './pokittypes/init'
	import { PokitOS } from './pokittypes/pokit';
	export let name: string;
	export let pokitinit: typeof init
	export let canvas: HTMLCanvasElement

	console.log(pokitinit)
	let initret = pokitinit({canvas})

	let fuckyou: HTMLElement
	onMount(()=>{
		fuckyou.appendChild(canvas)
	}) 

</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	<p bind:this={fuckyou}></p>
	{#await initret}
	<p>
		fak
	</p>
	{:then [engine, starter] }
	<p>{engine}</p>
	<p>{starter()}</p>
	{/await}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
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