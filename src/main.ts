import App from './App.svelte';
import init from '../engine/source/pokit/init.js'

console.log(init)

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;