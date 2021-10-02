<script lang='ts'>
    import type { GamepadMappings, GamepadMapping, GpInfo } from "../../pokittypes/modules/Engine/input/gamepad";
    export let activeMapping: GamepadMapping
    export let activeMappingName: string

    let deadzone: number = activeMapping?.deadzone
    $: if (activeMapping && deadzone != activeMapping?.deadzone) {
        activeMapping = Object.assign({}, activeMapping, {deadzone})
    }
</script>

{#if activeMappingName.startsWith('User: ')}
    User Mapping Detected
    <label for="deadzone">Dead Zone</label>
    <input type="range" min="0.0" max="0.1" bind:value="{activeMapping.deadzone}">
    <span>{activeMapping.deadzone}</span>

{/if}
