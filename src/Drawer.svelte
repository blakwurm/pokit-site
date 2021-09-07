<script lang="ts">
    export let hidden = false
</script>

<div id="drawer" class:hidden>
    <div id="drawerinner">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat laoreet ligula, ac finibus urna porttitor sed. Nam in vestibulum dolor, nec cursus arcu. Ut auctor, sem eu varius tristique, nunc nibh malesuada felis, vel mollis erat ligula nec lorem. Proin ac ex ut elit dapibus condimentum quis a mi. Nullam a erat quis elit pretium pretium. Sed nec turpis accumsan elit egestas faucibus et ut velit. Nunc quis sodales dolor. Praesent ante sem, pellentesque et aliquam ut, rhoncus ut ex.

Morbi eleifend erat eu nibh consectetur mollis. Nulla egestas consequat consectetur. Ut ante diam, sollicitudin sed lacinia vel, vestibulum vitae tortor. Vestibulum vitae sollicitudin augue. Nullam arcu nibh, posuere vel sapien ut, maximus maximus tellus. Suspendisse potenti. Duis iaculis felis at sapien cursus ullamcorper. Sed nunc leo, rhoncus sit amet congue non, molestie ut sem.

Nam condimentum nisi vitae hendrerit faucibus. Ut at dictum urna, vel tristique elit. Sed viverra mattis mattis. Nulla facilisi. Aliquam erat volutpat. Sed volutpat vitae arcu in tincidunt. Phasellus hendrerit purus in risus efficitur dignissim. Mauris ultrices tempor eros ac imperdiet. Nulla gravida et felis ut euismod. Aenean aliquet vel risus et pellentesque. Nunc vitae nulla tempor, euismod ligula a, eleifend eros. Sed rhoncus sit amet nisl sed rhoncus. Vivamus euismod ipsum sed nisl finibus varius. Mauris nec eros ante.

Donec sodales convallis elit non ullamcorper. Cras dapibus cursus eros, eu efficitur lectus efficitur vel. In semper in massa eu ultricies. Curabitur neque libero, porta eu finibus quis, dapibus at lorem. Nam viverra elit quis orci sodales, ornare consequat dolor consectetur. Proin suscipit odio a eros vulputate fringilla. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis rhoncus at magna id dictum. Fusce porta turpis viverra cursus mattis. Nulla dolor massa, accumsan eu pharetra eu, auctor quis diam. Nunc quis sem tempor, faucibus lorem a, scelerisque est. Quisque bibendum elit sed aliquet ullamcorper. Mauris odio tortor, dictum id leo ac, iaculis euismod tortor. Mauris pharetra porta congue.

Duis ac consequat risus. Duis interdum diam vel ultricies vulputate. Nullam quis vulputate enim, quis posuere libero. Morbi eget orci eget eros fringilla molestie id ac libero. Ut nisl elit, tincidunt vitae quam at, porta bibendum turpis. Etiam et massa mollis, ultrices erat sit amet, aliquam quam. Curabitur sapien tortor, auctor id mauris sit amet, fermentum imperdiet arcu. Sed laoreet ligula in sapien blandit interdum.
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
         box-shadow: inset 0 0 10px #000000;
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
</style>