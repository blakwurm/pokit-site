<script lang='ts'>
    import type { GamepadMappings, GamepadMapping, GpInfo } from "../../pokittypes/modules/Engine/input/gamepad";
    import type { Settings } from "../../pokittypes/modules/Engine/storage/storage";
    import type { PokitOS } from "../../pokittypes/pokit";
    // export let pokit: PokitOS
    // export let gpMapper: GamepadMappings
    // let activeMapping: GamepadMapping
    // $: activeMapping = gpMapper.mapping
    // let activeMappingName: string 
    // $: activeMappingName = gpMapper.mappingName

    export let pokit: PokitOS
    export let activeMapping: GamepadMapping
    export let activeMappingName: string 
    export let REMAPMODE: boolean
    export let currentButton: string

    $: if (activeMapping) {
        saveMapping()
    }

    let ishat = false

    let deadzone: number = deadzone_to_normalized(activeMapping?.deadzone)
    const deadzone_scale_strength = 4
    $: activeMapping.deadzone = normalized_to_deadzone(deadzone)

    function normalized_to_deadzone(normalized: number) {
        return normalized ? Math.pow(normalized, deadzone_scale_strength) : 0.01;
    }

    function deadzone_to_normalized(deadzone: number) {
        return Math.pow(deadzone || 0.01, 1/deadzone_scale_strength)
    }

    let reg = Pokit.modules.registerEvent.bind(Pokit.modules)

    reg('onGamepadInput', (pads: Gamepad[]) => {
        if(REMAPMODE && currentButton !== '') {
            // debugger;
            let gp = pads[0];
            console.log(gp)
            for(let i in gp.buttons) {
                if(gp.buttons[i].value > 0.5) {
                    activeMapping.buttons[i] = currentButton;
                    currentButton = '';
                    return;
                }
            }
            for(let i in gp.axes) {
                if(i === '9') continue;
                let value = gp.axes[i];
                if(Math.abs(value) > 0.5) {
                    let s = Math.sign(value);
                    let v = activeMapping.axes[i] || ['none','none'];
                    s = 1-((s+1)/2);
                    v[s] = currentButton;
                    activeMapping.axes[i] = v;
                    currentButton = '';
                    return;
                }
            }
        }
            if (!ishat && pads[0].axes[9]) {
                ishat = true
                activeMapping.hatSwitches[9] = [["up"],["up","right"],["right"],["down","right"],["down"],["down","left"],["left"],["up","left"]]
                currentButton = ''
                return;
            }
    })

    function refreshMapping() {
        activeMapping = Object.assign({}, activeMapping)
    }

    let saver = (pokit.modules.get('Settings') as Settings).path('@pokit/site/gpmappings')

    function saveMapping() {
        if (activeMappingName.startsWith('User: ')) {
            saver.set(activeMappingName, activeMapping as any)
        }
    }
    
    function deleteMappingAxis(a) {
        return function() {
            delete activeMapping.axes[a]
            refreshMapping()
        }
    }
    function deleteMappingButton(a) {
        return function() {
            delete activeMapping.buttons[a]
            refreshMapping()
        }
    }
    function deleteMappingHat(a) {
        return function() {
            delete activeMapping.hatSwitches[a]
            refreshMapping()
        }
    }
</script>

{#if activeMappingName.startsWith('User: ')}
    User Mapping Detected
    <label for="deadzone">Dead Zone</label>
    <input type="range" min=0 max=1 step=0.01 bind:value={deadzone}>
    <span>{normalized_to_deadzone(deadzone).toFixed(5)}</span>

    {#if ishat}
    <div>Hat Switch Detected</div>
    <div>The D-Pad on your controller has been automatically detected, and mapped accordingly.</div>
    <div>This cannot be changed in basic mode</div>
    {/if}
    <div>Axes</div>
    {#each Object.entries(activeMapping.axes) as [k,v]}
        <div>{k}:{v} <button on:click="{deleteMappingAxis(k)}">x</button></div>
    {/each}
    <div>Buttons</div>
    {#each Object.entries(activeMapping.buttons) as [k,v]}
        <div>{k}:{v} <button on:click="{deleteMappingButton(k)}">x</button></div>

    {/each}


{/if}
