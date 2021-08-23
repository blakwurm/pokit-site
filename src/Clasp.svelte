<script lang="ts">
    export let activated = false
    export let kickoff: () => Promise<void>

</script>

<div id="panels" class:active={activated}>
        <div id="panel-0"></div>
        <div id="panel-1"></div>
        <div id="panel-2"></div>
        <div id="panel-3"></div>
        <button id="activator" on:click={kickoff}></button>
        <div id="panel-5"></div>
        <div id="panel-6"></div>
        <div id="panel-7"></div>
        <div id="panel-8"></div>
</div>

<style>

    #panels {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
  		transition: top 1s, bottom 1s, left 1s, right 1s;
        margin: 0;
        padding: 0;
        z-index: 2000;
        --one-height: 33.333vh;
        --two-height: 66.666vh;
        --one-width: 33.333vw;
        --two-width: 66.666vw;
    }
    #panels.active {
        /* top: -50vh;
        bottom: -50vh;
        grid-row-gap: 50vh;
        right: -50vw;
        left: -50vw; 
        grid-column-gap: 50vw;*/
    }
    #panels div, #panels button{
        position: absolute;
        display: inline-block;
        width: calc(var(--one-width) - 6px);
        height: calc(var(--one-height) - 6px);
        background-color: rgba(102, 51, 153, 0.8);
        border: 3px inset grey;
  		transition: top 1s, bottom 1s, left 1s, right 1s, border-radius 1s;
        transition-timing-function: ease-in;
        padding: 0;
        margin: 0;
    }
    #panels.active div {
        border-radius: 30vmin;
    }
    #panel-0 {
        top: 0;
        left: 0;
    }
    .active #panel-0 {
        top: -100vh;
        left: calc(var(--two-width) * -1);
    }
    #panels #panel-1 {
        top: 0;
        left: var(--one-width);
        height: calc(var(--two-height) - 6px);
    }
    #panels.active #panel-1 {
        top: -300vh;
        left: var(--one-width);
    }
    #panel-2 {
        top: 0;
        left: var(--two-width);
    }
    #panels.active #panel-2 {
        top: -100vh;
        left: 200vw;
    }
    #panel-3 {
        top: var(--one-height);
        left: 0;
    }
    .active #panel-3 {
        top: var(--one-height);
        left: -100vw;
    }
    button#activator {
        position: absolute;
        top: calc(50vh - 12vmin);
        left: calc(50vw - 12vmin);
        width: 25vmin;
        height: 25vmin;
        margin: 0;
        padding: 0;
        border: outset grey 3px;
        background: darkgray;
    }
    .active button#activator {
        top: -300vh;
    }
    #panel-5 {
        top: var(--one-height);
        left: var(--two-width);
    }
    .active #panel-5 {
        top: var(--one-height);
        left: 200vw;
    }
    #panel-6 {
        top: var(--two-height);
        left: 0;
    }
    .active #panel-6 {
        top: 200vh;
        left: -100vh;
    }
    #panel-7 {
        top: var(--two-height);
        left: var(--one-width);
    }
    .active #panel-7 {
        top: 200vh;
        left: var(--one-width);
    }
    #panel-8 {
        top: var(--two-height);
        left: var(--two-width);
    }
    .active #panel-8 {
        top: 200vh;
        left: 200vw;
    }

</style>
