<script lang="ts">
    import {atomic_hue} from '../sitesettings.js'
</script>

<div>Hi</div>
<div id="setters">
    <div class="setting-setter">
        <label for="atomic-hue-modifier">Atomic Hue</label>
        <input id="atomic-hue-modifier" type="range" min="0" max="360" bind:value={$atomic_hue}>
    </div>
</div>

<style>
    #atomic-hue-modifier {
        /* filter: hue-rotate(calc(var(--theme-hue) - 150deg)); */
    }
</style>