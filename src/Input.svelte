<script lang="ts">
    import type { PokitOS } from "./pokittypes/pokit";
	import { onMount } from 'svelte';
    import Button from './Button.svelte'
    import {ButtonGroup, FaceButtonGroup} from './buttongroups'
    export let pokit: PokitOS
    let inputmap = new Map<string, number>()

    $: inputmap = pokit?.modules.get('input') as Map<string, number>

    let buttons = {
        "dpad": [
            ['UL', 'upleft'],
            ['U', 'up'],
            ['UR', 'upright'],
            ['L', 'left'],
            ['Dead', 'dead'],
            ['R', 'right'],
            ['DL', 'downleft'],
            ['D', 'down'],
            ['DR', 'downright'],
        ],
        "facebuttons": [
            ['X', 'x'],
            ['Y', 'y'],
            ['L', 'l'],
            ['A', 'a'],
            ['B', 'b'],
            ['R', 'r'],
        ],
        "optbuttons": [
            ['start', 'Start'],
            ['select', 'Select'],
            ['opt', 'Opt'],
        ]
    }


    function ondown(btnname: string, ev: MouseEvent) {
        console.log(btnname, 'down')
    }

    function onup(btnname: string, ev: MouseEvent) {
        console.log(btnname, 'up')
    }

    function onsurfaceup(ev: MouseEvent) {
        console.log('general up')
    }

    function onover(btnname: string, ev: MouseEvent) {
        console.log(btnname, 'over')
    }

    function onenter(btnname: string, ev: MouseEvent) {
        console.log(btnname, 'enter')
    }

    function onleave(btnname: string, ev: MouseEvent) {
        console.log(btnname, 'leave')
    }


    let handlers = new Map<string, ButtonGroup>()

    handlers.set('facebuttons', new FaceButtonGroup(inputmap))
    handlers.set('dpad', new ButtonGroup(inputmap))

    let dpad_handlers = {

    }


</script>

<div id="inputsurface"
    on:mouseup={onsurfaceup}

>

    {#each Object.entries(buttons) as buttongroup}
        <div id={buttongroup[0]} class="buttongroup">
            {#each buttongroup[1] as button}
                <div class="buttoncontainer {button[1]}">
                    <button
                        on:mousedown={(ev) => handlers.get(buttongroup[0]).down(button[1], ev)}
                        on:mouseup={(ev) => handlers.get(buttongroup[0]).up(button[1], ev)}
                        on:mouseenter={(ev) => handlers.get(buttongroup[0]).enter(button[1], ev)}
                        on:mouseleave={(ev) => handlers.get(buttongroup[0]).leave(button[1], ev)}
                    >{button[0]}</button>
                </div>
            {/each}
        </div>
    {/each}
</div>


<style>
    #inputsurface {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1;
    }

    .buttongroup {
        position: absolute;
        border: blue 1px solid;
    }

    .buttongroup .buttoncontainer {
        position: absolute;
    }

    .buttongroup .buttoncontainer button {
        position: relative;
        z-index: 700;
    }

    #dpad {
        top: 115vmin;
        left: 2vmin;
        width: 45vmin;
        height: 45vmin;
        background-image: url('/img/atomic/dpad2.svg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        filter: hue-rotate(var(--theme-hue)) saturate(0.8);
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
    }
    #dpad .buttoncontainer {
        position: relative;
        --encroach: 30vmin;
    }
    #dpad .buttoncontainer button {
        width: 100%;
        height: 100%;
        display: inline-block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    /* #dpad .up {
        top: 0;
        right: 0;
        bottom: var(--encroach);
        left: 0;
    }
    #dpad .down {
        bottom: 0;
        right: 0;
        top: var(--encroach);
        left: 0;
    }
    #dpad .right {
        top: 0;
        bottom: 0;
        left: var(--encroach);
        right: 0;
    }
    #dpad .left {
        top: 0;
        bottom: 0;
        right: var(--encroach);
        left: 0;
    }
    #dpad .dead {
        right: calc(var(--encroach) / 2);
        left: calc(var(--encroach) / 2);
        top: calc(var(--encroach) / 2);
        bottom: calc(var(--encroach) / 2);

    } */
    #facebuttons {
        top: 120vmin;
        right: 2vmin;
        display: grid;
        transform: rotate(-25deg);
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr;
    }
    #facebuttons button {
        width: 12vmin;
        height: 12vmin;
        border-radius: 20vmin;
        transform: rotate(25deg);
        background-color: transparent;
        border: none;
        filter: hue-rotate(var(--theme-hue)) saturate(0.8);
        background-image: url('/img/atomic/ottertex.png'), url('/img/atomic/roundbutton2.svg');
        background-size: cover, cover;
        background-position: center, center;
        background-repeat: no-repeat, no-repeat;
        /* box-shadow:inset 0px 1px 0px 0px #f7c5c0; */
            /* background:linear-gradient(145deg, hsla(0, 50%, 80%, 1) 5%, hsla(0, 50%, 20%, 1) 100%);
            background-color:#fc8d83; */
        text-shadow:0px 1px 0px hsla(0, 20%, 80%, 0.5);
    }
    #facebuttons .buttoncontainer {
        position: relative;
    }
    #optbuttons {
        bottom: 10vw;
    }


</style>