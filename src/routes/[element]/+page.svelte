<script lang="ts">
  import ElementModel from "../components/ElementModel.svelte";
  export let data: any;
</script>

{#if data.elementData}
    <ElementModel element={data.elementData} />
  {:else}
    <div>
      <h1>{data.error}</h1>
    </div>
  {/if}
