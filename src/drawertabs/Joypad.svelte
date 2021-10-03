<script lang="ts">
    import { debug, each } from "svelte/internal";
    import type { GamepadMappings, GamepadMapping, GpInfo } from "../pokittypes/modules/Engine/input/gamepad";
    import type { PokitOS } from "../pokittypes/pokit";
    import MapperUI from './gamepad/MapperUI.svelte'

    let newmappingname = ''
    console.log('gamepads', navigator.getGamepads())

    let REMAPMODE = true

    export let pokit: PokitOS
    $: console.log('pokit is', pokit)

    let gamepadmappings: GamepadMappings
    $: gamepadmappings = pokit?.modules?.get('GamepadMappings') as GamepadMappings
    let connectedGamepads: string[] = []
    // $: connectedGamepads = gamepadmappings?.connectedGamepads || []

    let mappingOptions: string[] = []

    let activeGamepads: string[] = []
    let activeMappingName: string = ''
    let activeMapping: GamepadMapping

    let sanitizedTitles: GpInfo[] = []
    $: sanitizedTitles = connectedGamepads.map(id=>gamepadmappings?.getGpInfo(id))

    let currentButton = '';

    let currentInputs: Record<string, number> = {}

    function getDisplayLabels(mapping: GamepadMapping) {
        mapping.gamepads = mapping.gamepads || []
        let labels = [];
        let n = mapping.gamepads.length > activeGamepads.length ? mapping.gamepads.length : activeGamepads.length;
        for(let i = 0; i < n; n++) {
            let indexLabel = n < mapping.gamepads.length ? mapping.gamepads[0] : `Gamepad ${i}`;
            let gpLabel = n < activeGamepads.length ? activeGamepads[i] : 'None Selected';
            labels.push(`${indexLabel}: ${gpLabel}`)
        }
        return labels
    }


    function gamepadSelectChange(ev: Event) {
        let elem = ev.target as HTMLSelectElement
        console.log(elem.value)
        gamepadmappings.gamepads = [elem.value]
        // let selected = elem.options[elem.options.selectedIndex]
        // let value = selected.value
    }

    function gamepadMappingChange(ev: Event) {
        let elem = ev.target as HTMLSelectElement
        console.log(elem.value)
        gamepadmappings.setMapping(elem.value)
    }

    /*
    Events spawned by the system
     onActiveGpMapChanged(name: string)
     onGpMapUpdated(name: string, map: GamepadMapping)
     onGamepadInput(gamepads: Gamepad[])
     onActiveGpChanged(activeGps: string[])
     onGpConnected(id: string)
     onGpDisconnected(id: string)
     onInputMapUpdated(map: Map<string, number>)
    */
    let needsRunning = true;
    $: if (pokit && needsRunning) {
        let reg = Pokit.modules.registerEvent.bind(Pokit.modules)
        let refreshGamepads = () => connectedGamepads = gamepadmappings?.connectedGamepads
        let refreshMapings = () => mappingOptions = [...gamepadmappings?.keys()]
        let refreshActiveGamepad = () => activeGamepads = gamepadmappings?.gamepads
        let refreshActiveMapping = () => {
            activeMappingName = gamepadmappings?.mappingName
            activeMapping = gamepadmappings?.mapping
        }
        refreshGamepads()
        refreshMapings()
        refreshActiveGamepad()
        refreshActiveMapping()
        reg('onGpConnected', id=>{
            refreshGamepads()
            refreshActiveGamepad()
        })
        reg('onGpDisconnected', id=>{
            refreshGamepads()
            refreshActiveGamepad()
        })
        reg('onGpMapUpdated', (name: string, map: GamepadMapping) => {
            refreshMapings()
            refreshActiveMapping()
        })
        reg('onActiveGpMapChanged', (name: string)=>{
            refreshMapings()
            refreshActiveMapping()
        })
        reg('onInputMapUpdated', (map:Map<String, number>)=>{
            currentInputs = Object.fromEntries(map)
        })
        let inputMod = Pokit.modules.get('input') as Map<string, number>
        if (inputMod.size > 0) {
            currentInputs = Object.fromEntries(inputMod)
        }

        // newmappingname = 'testificate'
        // makeNewMapping()
        needsRunning = false
    }

setTimeout(() => {
        // debug
        // yeah
},1);
var getStackTrace = function() {
  var obj:any = {};
  Error.captureStackTrace(obj, getStackTrace);
  return obj.stack;
};



console.log(getStackTrace());


function remapButtonPress(inputkey) {
    return function (ev) {
        currentButton = inputkey;
    }
}

$: console.log(newmappingname)
function modMappingName() {
    return `User: ${newmappingname}`
}
function makeNewMapping() {
    console.log('making new called', modMappingName())
    gamepadmappings.makeEmptyMapping(modMappingName())
}
function cloneCurrentMapping() {
    console.log('cloning, calling it', modMappingName())
    gamepadmappings.clone(activeMappingName, modMappingName())
}

</script>

<div>This is joypad</div>

<div>
    View: <button>Basic</button> <button>Advanced</button>
</div>
<div>
    <select name="controllerselect0" id="controllerselect0" on:change={gamepadSelectChange}>
        {#each sanitizedTitles as sanititle}
            <option value="{sanititle.id}" selected={sanititle.id===activeGamepads[0]}>{sanititle.title} : {sanititle.index}</option>
        {/each}
    </select>
    <select name="mappingselect" id="mappingselect" on:change={gamepadMappingChange}>
        {#each mappingOptions as mapping}
            <option value="{mapping}" selected={activeMappingName===mapping}>{mapping.toLocaleUpperCase().replace('_', ' ')}</option>
        {/each}
    </select>
</div>
<div id="buttonreppers">
    <div>Button Input Mapper</div>
    {#each Object.entries(currentInputs) as [a,b]}
        {#if a !== "none"}
            <button on:click={remapButtonPress(a)} class="buttonrep {a}" class:tbMapped={currentButton === a} style="--pressed-amt:{b}">{a}</button>   
        {/if}
    {/each}
</div>
<button on:click="{()=>REMAPMODE = !REMAPMODE}">Toggle Remap Mode</button>
<div>Remap Mode is: {REMAPMODE ? 'on' : 'off'}</div>

{#if REMAPMODE}
<p>First, make a new mapping</p>
    <button on:click={makeNewMapping}>New Mapping</button>
    <button on:click={cloneCurrentMapping}>Clone Current</button>
    <input type="text" placeholder="New Mapping Name" bind:value={newmappingname}>
<p>Then, press one of the buttons under "Button Input Mapper", then press a button on the active gamepad.</p>
    {#if activeMapping}
        <!-- <MapperUI gpMapper={gamepadmappings} bind:pokit></MapperUI> -->
        <MapperUI 
            bind:activeMapping 
            bind:activeMappingName 
            bind:pokit
            bind:REMAPMODE
            bind:currentButton
        ></MapperUI>
    {/if}
{/if}

<style>
    #buttonreppers {
        position: relative;
        height: 7em;
    }
    #buttonreppers button.buttonrep {
        display: inline-block;
        position: absolute;
        background: none;
        color: hsla(40, 100%, calc(50% * var(--pressed-amt)), 1);
        background-color: hsla(0, calc(100% * var(--pressed-amt)), 50%, 1);
        padding: unset;
        margin: unset;
    }
    #buttonreppers button.tbMapped {
        color: black;
        background-color: white;
    }
    button.buttonrep.up {
        padding-left: 5ch;
    }
    .up {
        left: 5ch;
        width: 5ch;
    }
    .down {
        left: 5ch;
        top: 3em;
        width: 5ch;
    }
    .left {
        top: 2em;
        width: 5ch
    }
    .right {
        top: 2em;
        left: 10ch;
    }

    .a {
        top: 4em;
        left: 18ch;
        width: 1ch;
    }
    .b {
        top: 3em;
        left: 19ch;
        width: 1ch;
    }
    .x {
        top: 3em;
        left: 17ch;
        width: 1ch;
    }
    .y {
        top: 2em;
        left: 18ch;
        width: 1ch;
    }
    .l {
        left: 19ch;
        width: 1ch;
    }
    .r {
        top: 2em;
        left: 20ch;
        width: 1ch;
    }
    
    .start {
        top: 5em;
        width: 5ch;
    }
    .select {
        top: 5em;
        left: 6ch;
        width: 6ch;
    }
    .opt {
        top: 5em;
        left: 13ch;
        width: 3ch;
    }
</style>