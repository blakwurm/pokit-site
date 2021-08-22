import App from './App.svelte';

let pokitinit = window['pokitinit']

const app = new App({
	target: document.body,
	props: {
		name: 'world',
		pokitinit
	}
});

export default app;