<script lang='ts'>
    import type { GamepadMappings, GamepadMapping, GpInfo } from "../../pokittypes/modules/Engine/input/gamepad";
    export let gpMapper: GamepadMappings
    let activeMapping: GamepadMapping
    $: activeMapping = gpMapper.mapping
    let activeMappingName: string 
    $: activeMappingName = gpMapper.mappingName

    let deadzone: number = deadzone_to_normalized(activeMapping?.deadzone)
    const deadzone_scale_strength = 4
    $: activeMapping.deadzone = normalized_to_deadzone(deadzone)

    function normalized_to_deadzone(normalized: number) {
        return normalized ? Math.pow(normalized, deadzone_scale_strength) : 0.01;
    }

    function deadzone_to_normalized(deadzone: number) {
        return Math.pow(deadzone || 0.01, 1/deadzone_scale_strength)
    }



</script>

{#if activeMappingName.startsWith('User: ')}
    User Mapping Detected
    <label for="deadzone">Dead Zone</label>
    <input type="range" min=0 max=1 step=0.01 bind:value={deadzone}>
    <span>{normalized_to_deadzone(deadzone).toFixed(5)}</span>

{/if}
