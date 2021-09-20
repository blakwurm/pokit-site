<script lang="ts">
    import type { PokitOS } from "./pokittypes/pokit";
	import { onMount } from 'svelte';
    import Button from './Button.svelte'
    import {ButtonGroup, FaceButtonGroup, DPadGroup} from './buttongroups'
    export let pokit: PokitOS
    let inputmap: Map<string, number>

    $: inputmap = pokit?.modules.get('input') as Map<string, number>
    $: console.log(inputmap)

    function loop() {
        
    }

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

    function name_from_id(elem: Element) {
        return elem?.id.split('button-')[1]
    }

    class PointerOverlay {
        constructor(grouphandlers: ButtonGroup) {
            this.grouphandlers = grouphandlers
        }

        grouphandlers: ButtonGroup
        last_elem: Element
        current_id: number

        down(ev: PointerEvent) {
            this.current_id = ev.pointerId
            this.last_elem = ev.target as HTMLElement
            let name = name_from_id(ev.target as Element)
            if (name) {
                this.grouphandlers.down(name)
            }
        }

        up(ev: PointerEvent) {
                let elem = document.elementFromPoint(ev.clientX, ev.clientY)
                let name = name_from_id(elem)
                if (name) {
                    this.grouphandlers.up(name)
                }
                this.current_id = null
                this.last_elem = null

        }

        leave(ev: PointerEvent) {
            this.up(ev)
        }

        move(ev: PointerEvent) {
                let x = ev.clientX
                let y = ev.clientY
                let elem = document.elementFromPoint(x,y)
                if (this.last_elem != elem) {
                    let old_name = name_from_id(this.last_elem)                
                    if (old_name) {
                        this.grouphandlers.leave(old_name)
                    }
                    let new_name = name_from_id(elem)
                    if (new_name) {
                        this.grouphandlers.enter(new_name)
                    }
                    this.last_elem = elem
                }

        }
        
        cancel(ev: Event) {
            ev.preventDefault()
        }


    }

    let handlers = new Map<string, PointerOverlay>()

    let dpad_handlers = {

    }

    function call_the_handler(handler, buttonname, ev: Event) {
        // ev.preventDefault()
        handler(buttonname)
    }

    function negate_default(ev: Event) {
        ev.preventDefault()
    }


    $: handlers.set('facebuttons', new PointerOverlay(new FaceButtonGroup(inputmap)))
    $: handlers.set('dpad', new PointerOverlay(new DPadGroup(inputmap)))
    $: handlers.set('optbuttons', new PointerOverlay(new ButtonGroup(inputmap)))

    /*
                        on:pointerdown={(ev) => call_the_handler(btn=>handlers.get(buttongroup[0]).down(btn, ev), button[1], ev)}
                        on:pointerup={(ev) => call_the_handler(btn=>handlers.get(buttongroup[0]).up(btn,ev), button[1], ev)}
                        on:pointerenter={(ev) => call_the_handler(btn=>handlers.get(buttongroup[0]).enter(btn,ev), button[1], ev)}
                        on:pointerleave={(ev) => call_the_handler(btn=>handlers.get(buttongroup[0]).leave(btn,ev), button[1], ev)}

                    on:pointerdown={ev=>console.log('pointerdown on', button[1])}
                    on:pointerup={ev=>console.log('pointerup on', button[1])}
                    on:pointerenter={ev=>console.log('pointerenter on', button[1])}
                    on:pointerleave={ev=>console.log('pointerleave on', button[1])}
    **/

</script>

<div id="inputsurface">

    {#each Object.entries(buttons) as buttongroup}
        <div id={buttongroup[0]} class="buttongroup"
        on:pointerdown={ev=>handlers.get(buttongroup[0]).down(ev)}
        on:pointerup={ev=>handlers.get(buttongroup[0]).up(ev)}
        on:pointermove={ev=>handlers.get(buttongroup[0]).move(ev)}
        on:pointerleave={ev=>handlers.get(buttongroup[0]).leave(ev)}
        on:pointercancel={ev=>handlers.get(buttongroup[0]).cancel(ev)}
        >
            {#each buttongroup[1] as button}
                <div class="buttoncontainer {button[1]}">
                    <button id="button-{button[1]}"
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
        /* border: blue 1px solid; */
        border: none;
        touch-action: none;
    }

    .buttongroup .buttoncontainer {
        position: absolute;
    }

    .buttongroup .buttoncontainer button {
        position: relative;
        z-index: 700;
        touch-action: none;
    }

    #dpad {
        top: 99vw;
        left: 8vmin;
        width: 38vmin;
        height: 38vmin;
        background-image: url('/img/atomic/dpad2.svg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        filter: hue-rotate(var(--theme-hue)) saturate(0.8);
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
    }
    @media (orientation: landscape) {
        #dpad {
            top: 10vh;
            right: calc(50vh + 50vw);
            left: unset;
        }
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
        background: transparent;
        border: none;
        color: transparent;
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
        top: 103vw;
        right: 8vmin;
        display: grid;
        transform: rotate(-25deg);
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr;
    }
    @media (orientation: landscape) {
        #facebuttons {
            top: 10vh;
            left: calc(50vh + 52vw);
            right: unset;
        }
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
        position: absolute;
        bottom: 5vw;
        left: calc(100vw - 26ch);
    }
    @media (orientation: landscape) {
        div#optbuttons.buttongroup {
            left: 5vmin;
            bottom: 1vmin;
        }
    }
    #optbuttons .buttoncontainer {
        display: absolute;
    }
    #optbuttons button {
        position: absolute;
        border-image: url("/img/atomic/roundbutton2.svg");
        border-image-slice: 14 fill;
        border-image-width: 5vmin 5vmin 5vmin 5vmin;
        background: none;
        text-shadow:0px 1px 0px hsla(0, 20%, 80%, 0.5);
        width: 6ch;

    }
    #button-Start {
        bottom: 0;
    }
    #button-Select {
        bottom: 0vmin;
        left: 7ch;
    }
    #button-Opt {
        bottom: 0vmin;
        left: 14ch;
    }
    @media (orientation: landscape) {
        #button-Start {
            bottom: 0;
        }
        #button-Select {
            bottom: 11vmin;
            left: 0;
        }
        #button-Opt {
            bottom: 22vmin;
            left: 0;
        }
    }
    @media (orientation: landscape) and  (max-aspect-ratio: 639/361) {
        #facebuttons button {
            width: 5vmin;
            height: 5vmin;
        }
        #facebuttons {
            top: 10vh;
            left: calc(50vh + 50vw);
            right: unset;
        }
        #dpad {
            top: 10vh;
            right: calc(50vh + 48vw);
            left: unset;
            width: 18vmin;
            height: 18vmin;
        }

    }


</style>