<script lang="ts">
import type { PokitOS } from "../pokittypes/pokit";

    console.log('gamepads', navigator.getGamepads())

    export let pokit: PokitOS
    $: console.log('pokit is', pokit)

    $: gamepadmappings = pokit?.modules?.get('GamepadMappings')

    /*
    Events spawned by the system
     onActiveGpMapChanged(name: string)
     onGpMapUpdated(name: string, map: GamepadMapping)
     onGamepadInput(gamepads: Gamepad[])
     onActiveGpChanged(activeGps: string[])
    */
    $: if (pokit) {
        window.Pokit.modules.registerEvent("onActiveGpChanged", function(activeGps: string[]) {
            console.log('foooo')

        })
    }


</script>

<div>This is joypad</div>