<script lang="ts">
    import Settings from './drawertabs/Settings.svelte'
    import Joypad from './drawertabs/Joypad.svelte'
    import Chat from './drawertabs/Chat.svelte'
    import Gameinfo from './drawertabs/Gameinfo.svelte'
    export let hidden = false

    let tabs = {
        'gameinfo':  {name: "Gameinfo", display: "Info", component: Gameinfo},
        'chat':  {name: "Chat", display: "Chat", component: Chat},
        'settings':  {name: "Settings", display: "Sett", component: Settings},
        'joypad':  {name: "Joypad", display: "Gpad", component: Joypad},
    }

    let selected_tab = 'settings' 
</script>

<div id="drawer" class:hidden>
    <button id="drawertoggle" on:click="{(ev)=>hidden = !hidden}"> <span> ⚙ </span></button>
    <div id="drawerinner">
        <div class="comp-container">
            <svelte:component this={tabs[selected_tab].component} />
        </div>
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
    </div>
</div>

<div id="drawer-backmask" class:hidden>

</div>

<style>
     #drawer {
         font-family: 'VGA', monospace;
         color: white;
         position: absolute;
         left: 2vw;
         top: 1vh;
         bottom: 1vh;
         width: 96vw;
         z-index: 1000;
         border-image: url("/img//atomic/drawerscreen.svg");
         border-image-slice: 50 fill;
         border-image-width: 15vmin;
         transition: left 1s;
         filter: hue-rotate(var(--theme-hue)) drop-shadow(0.4vmin 1vmin 0.5vmin rgba(0,0,0,0.3));
         pointer-events: auto;
     }
     #drawer * {
         font-family: 'VGA', monospace;
         border-radius: 0;
         filter: unset;
     }
     #drawer.hidden {
        left: calc(100vw + 0vmin);
     }
     #drawer-backmask {
         position: absolute;
         top: 0;
         bottom: 0;
         right: 0;
         left: 0;
         z-index: 990;
         opacity: 50%;
         background: hsla(var(--theme-hue), 50%, 50%, 0.2);
         transition: opacity 1s;
     }
     #drawer-backmask.hidden {
         opacity: 0;
         pointer-events: none;
     }
     #drawerinner {
         position: absolute;
         left: 5vmin;
         right: 5vmin;
         bottom: 5vmin;
         top: 5vmin;
         /* box-shadow: inset 0 0 10px #000000; */
         z-index: 10000;
         border: double 6px grey;
         border-bottom: solid 2px grey;
     }
     .comp-container {
         height: calc(100% - 8vmin + 1px);
         overflow-x: scroll;

     }
     #drawertoggle {
         position: absolute;
         left: calc(100vw - 15vmin);
         bottom: calc(100vh - 20vmin);
         margin: 0;
         width: 25vmin;
         height: 10vmin;
         background: none;
         border-image: url("/img/atomic/roundbutton2.svg");
         border-image-slice: 14 fill;
         border-image-width: 5vmin 5vmin 5vmin 5vmin;
         display: flex;
         align-items: left;
         z-index: 11000;
         transition: left 1s, bottom 1s;
         filter: drop-shadow(1vmin 1vmin 0.5vmin black);
     }
     .hidden #drawertoggle {
         left: -10vmin;
         bottom: 10vmin;
     }
     #drawertoggle span {
         /* position: absolute;
         left: 1vmin; */
         font-size: 10vmin;
         margin-top: -4vmin;

     }

     #drawerinner ul {
         color: white;
         position: absolute;
         display: flex;
         justify-content: left;
         padding: 0;
         margin: 0;
         bottom: 0;
         width: 100%;
         background: grey;
     }

     #drawerinner ul li {
         list-style: none;
         padding: 0;
         margin: 0;
     }

     #drawerinner ul li button{
         min-width: 15vmin;
         font-size: 4vmin;
         padding: 0;
         margin: 0;
         background: none;
         border: none;
         /* border-bottom: 1px solid black; */
         height: 7vmin;
         border-radius: 0;
     }
     #drawerinner ul li button::first-letter {
         font-size: 150%;
         text-decoration: underline;
     }
     #drawerinner ul li button.selected{
        /* border-bottom: 3px solid black; */
        background: red;
        /* border-bottom: solid 0.5vmin grey; */
     }
</style>