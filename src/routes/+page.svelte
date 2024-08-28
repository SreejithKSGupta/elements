<script lang="ts">
   import { elements } from '$lib/db';
  import ElementData from './components/ElementModel.svelte';
  import Elementbox from './components/elementbox.svelte';
  import Optionspanel from './components/optionspanel.svelte';
  import { Box, Modal } from '@svelteuidev/core';
  import { scale } from 'svelte/transition';

  let selectedElement: any = null;
  let isModalOpen = false;

  function showDetails(element: any): void {
    selectedElement = element;
    isModalOpen = true;
  }

  function closeModal() {
    isModalOpen = false;
  }
</script>
<div id="controlpanel" style="height: 10vh;">
 <Optionspanel/>
</div>

  <div  class="periodic_table">
    {#each elements as element}
      <Elementbox element={element} show={showDetails} />
    {/each}
</div>

  {#if isModalOpen}
  <div transition:scale={{ duration: 300 }}>
    <Modal 
      title={selectedElement ? selectedElement.name : 'Element Details'} 
      centered 
      opened={isModalOpen}
      on:close={closeModal}
      overlayBlur={3}
      size="full" 
      overflow="inside"
      overlayOpacity={0.5}
      style="::webkit-scrollbar-width:0px;"
    >
      <ElementData element={selectedElement} />
    </Modal>
  </div>
  {/if}

  <style>
    .periodic_table {
      display: grid;
      grid-template-columns: repeat(18, 1fr);
      grid-template-rows: repeat(7, 1fr);
      gap: 0.3rem;
      width: 95vw;
      height: 80vh;
      overflow: scroll;
    }
  
    @media (max-height: 500px) {
      .periodic_table {
        gap:0.2rem;
      }
    }
  </style>
  