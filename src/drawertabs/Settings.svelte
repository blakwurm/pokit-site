<script lang="ts">
    import {atomic_hue} from '../sitesettings.js'
    let hue_choices = [
        {name: "Purple", hue: 263},
        {name: "Green", hue: 129},
        {name: "Orange", hue: 46},
        {name: "Pink", hue: 320},
        {name: "Blue", hue: 212},
        {name: "Red", hue: 0},
    ]
</script>

<div id="setters">
    <div class="setting-setter">
        <label for="atomic-hue-modifier">Atomic Hue</label>
        <select bind:value={$atomic_hue} class="buttonset">
            {#each hue_choices as {name, hue}}
                <option value="{hue}" class:selected={$atomic_hue === hue} on:click="{e=>$atomic_hue=hue}">{name}</option>
            {/each}
        </select>
    </div>
</div>

<style>
    #atomic-hue-modifier {
        /* filter: hue-rotate(calc(var(--theme-hue) - 150deg)); */
    }
    input[type=range] {
        background: blue;
    }
    .buttonset {

    }
</style>
