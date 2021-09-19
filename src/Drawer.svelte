<script lang="ts">
    import Settings from './drawertabs/Settings.svelte'
    import Joypad from './drawertabs/Joypad.svelte'
    import Chat from './drawertabs/Chat.svelte'
    import Gameinfo from './drawertabs/Gameinfo.svelte'
    export let hidden = false

    let tabs = {
        'gameinfo':  {name: "Gameinfo", display: "ℹ️", component: Gameinfo},
        'chat':  {name: "Chat", display: "💬", component: Chat},
        'settings':  {name: "Settings", display: "⚙️", component: Settings},
        'joypad':  {name: "Joypad", display: "🎮", component: Joypad},
    }

    let selected_tab = 'settings' 
</script>

<div id="drawer" class:hidden>
    <div id="drawerinner">
        <ul>
            {#each Object.entries(tabs) as tab}
                <li>
                    <button
                        class:selected={tab[0] === selected_tab}
                        on:click="{ev=>selected_tab=tab[0]}"
                        >
                        {tab[1].display}
                    </button>
                </li>
            {/each}
        </ul>
        <div class="comp-container">
            <svelte:component this={tabs[selected_tab].component} />
        </div>
    </div>
    <button id="drawertoggle" on:click="{(ev)=>hidden = !hidden}"> <span> ⚙ </span></button>
</div>

<div id="drawer-backmask" class:hidden>

</div>

<style>
     #drawer {
         position: absolute;
         left: 2vw;
         top: 0vh;
         bottom: 0vh;
         width: 98vw;
         z-index: 1000;
         border-image: url("/img//atomic/drawerback.svg");
         border-image-slice: 20 fill;
         border-image-width: 20vmin;
         transition: left 1s;
         filter: hue-rotate(var(--theme-hue)) drop-shadow(0 0 0.75rem rgb(44, 44, 44));
         pointer-events: auto;
     }
     #drawer.hidden {
        left: calc(100vw - 5vmin);
     }
     #drawer-backmask {
         position: absolute;
         top: 0;
         bottom: 0;
         right: 0;
         left: 0;
         z-index: 999;
         opacity: 50%;
         background: hsla(var(--theme-hue), 50%, 50%, 0.5);
         transition: opacity 1s;
     }
     #drawer-backmask.hidden {
         opacity: 0;
         pointer-events: none;
     }
     #drawerinner {
         position: absolute;
         left: 12vmin;
         right: 12vmin;
         bottom: 12vmin;
         top: 12vmin;
         border-radius: 4vmin;
         overflow-x: scroll;
         /* box-shadow: inset 0 0 10px #000000; */
         z-index: 10000;
     }
     #drawertoggle {
         position: absolute;
         left: -3.9vmin;
         bottom: 5vmin;
         margin: 0;
         width: 10vmin;
         height: 25vmin;
         background: none;
         border-image: url("/img//atomic/drawertab.svg");
         border-image-slice: 16 11 6 6 fill;
         border-image-width: 16vmin 11vmin 6vmin 6vmin;
     }
     #drawertoggle span {
         position: absolute;
         left: 1vmin;
         font-size: 10vmin;

     }

     #drawerinner ul {
         display: flex;
         justify-content: center;
         padding: 0;
         margin: 1vmin 0;
     }

     #drawerinner ul li {
         list-style: none;
         padding: 0;
         margin: 0;
     }

     #drawerinner ul li button{
         height: 10vmin;        
         min-width: 15vmin;
         font-size: 8vmin;
         padding: 0;
         margin: 0;
         background: none;
         border: none;
         border-bottom: 1px solid black;
     }
     #drawerinner ul li button.selected{
        border-bottom: 3px solid black;
     }
</style>