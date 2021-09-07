import App from './App.svelte';

let params = new URLSearchParams(window.location.search)

// Disable the context menu, because we really don't want it
window.oncontextmenu = function(event) {
	event.preventDefault();
	event.stopPropagation();
	return false;
};

const app = new App({
	target: document.body,
	props: {
		activated: params.has('noclasp')
	}
});

export default app;