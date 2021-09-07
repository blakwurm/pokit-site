<script lang="ts">
    import {atomic_hue} from '../sitesettings.js'
</script>

<div>Hi</div>
<label for="atomic-hue-modifier">Atomic Hue</label>
<span>{$atomic_hue}</span>
<input id="atomic-hue-modifier" type="range" min="0" max="360" bind:value={$atomic_hue}>

<style>
    #atomic-hue-modifier {
        /* filter: hue-rotate(calc(var(--theme-hue) - 150deg)); */
    }
</style>