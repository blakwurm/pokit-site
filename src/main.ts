import App from './App.svelte';

let params = new URLSearchParams(window.location.search)

const app = new App({
	target: document.body,
	props: {
		activated: params.has('noclasp')
	}
});

export default app;