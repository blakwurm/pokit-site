<script lang="ts">
    import type { PokitOS } from "../pokittypes/pokit";
    export let pokit: PokitOS
</script>

<div>
    <div>Title: {pokit.cart.name}</div>
    <div>By: {pokit?.cart.author}</div>
</div>