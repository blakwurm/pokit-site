<script lang="ts">
    export let canvas: HTMLCanvasElement
    export let activated: boolean = false
    export let is_error: boolean = false
</script>


<div id="containercontainer">
	<div id="screencontainer">
		<canvas width=320 height=320 bind:this={canvas}></canvas>
		<div class="borderdummy"></div>
		<div class="statuslight" class:active={activated} class:error={is_error}></div>
	</div>
</div>

<style>
	canvas {
		position: absolute;
		top: 5vmin;
		left: 5vmin;
        width: 85vmin;
        height: 85vmin;
        image-rendering: pixelated;
        image-rendering: -webkit-crisp-edges;
        image-rendering: pixelated;
        image-rendering: crisp-edges;
        background-color: white;
        border-radius: 1.5vmin;
        z-index: 520;
	}
	#containercontainer {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;
	}
	#screencontainer {
		position: absolute;
		/* position: relative; */
        width: 105vmin;
        height: 105vmin;
        z-index: 20;
		/* left: calc(100vmin - 40vw); */
		margin-left: 12vmin;
	}
	#screencontainer .borderdummy {
		position: absolute;
		display: block;
		background-image: url('/img/atomic/screenborder3.svg');
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		left: -5vmin;
		top: -5vmin;
        width: 100%;
		height: 100%;
		z-index: 500;
		filter: hue-rotate(var(--theme-hue));
	}
	#screencontainer .statuslight {
		position: absolute;
		width: 3vmin;
		height: 3vmin;
        right: 15vmin;
        bottom: 10vmin;
		background-color: black;
		border-radius: 5vmin;
	}
	#screencontainer .statuslight.active {
		background: radial-gradient(yellowgreen, black);;
	}
	#screencontainer .statuslight.error {
		background: radial-gradient(red, black);;
	}
</style>