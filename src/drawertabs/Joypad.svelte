<script lang="ts">
    import { each } from "svelte/internal";
    import type { GamepadMappings, GamepadMapping, GpInfo } from "../pokittypes/modules/Engine/input/gamepad";
    import type { PokitOS } from "../pokittypes/pokit";

    console.log('gamepads', navigator.getGamepads())

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

    let latestGpInput = ''

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
    */
    $: if (pokit) {
        let reg = Pokit.modules.registerEvent.bind(Pokit.modules)
        let refreshGamepads = () => connectedGamepads = gamepadmappings?.connectedGamepads
        let refreshMapings = () => mappingOptions = [...gamepadmappings?.keys()]
        let refreshActiveGamepad = () => activeGamepads = gamepadmappings?.gamepads
        let refreshActiveMapping = () => {
            activeMappingName = gamepadmappings?.mappingName
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
        reg('onGamepadInput', (pads: Gamepad[]) => {
            // TODO
        })
        reg('onGpMapUpdated', (name: string, map: GamepadMapping) => {
            refreshMapings()
        })
        reg('onActiveGpMapChanged', (name: string)=>{
            refreshMapings()
            refreshActiveMapping()
        })
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
<div>


</div>
<div>{latestGpInput}</div>