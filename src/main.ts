import App from './App.svelte';

let canvas = document.createElement('canvas')
canvas.width = 320
canvas.height = 320
let pokitinit = window['pokitinit']

console.log('pokitinit', pokitinit)

const app = new App({
	target: document.body,
	props: {
		name: 'world',
		canvas,
		pokitinit
	}
});

export default app;