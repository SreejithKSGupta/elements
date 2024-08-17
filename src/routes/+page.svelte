<script lang="ts">
  import { elements } from './db.js';
  import ElementData from './ElementModel.svelte';
  import Elementbox from './elementbox.svelte';
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

<Box 
  style="
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
    align-items: center; 
    width: 100vw; 
    height: 90vh; 
    background-color: rgb(14, 2, 66);
  "
>
  <Box 
    style="
      display: grid;
      grid-template-columns: repeat(18, 1fr);
      grid-template-rows: repeat(7, 1fr);
      gap: 0.3rem;
      width: 95vw;
    "
  >
    {#each elements as element}
      <Elementbox element={element} show={showDetails} />
    {/each}
  </Box>

  {#if isModalOpen}
  <div transition:scale={{ duration: 300 }}>
    <Modal 
      title={selectedElement ? selectedElement.name : 'Element Details'} 
      centered 
      opened={isModalOpen}
      on:close={closeModal}
      overlayBlur={3}
      size="lg" 
      overflow="inside"
      overlayOpacity={0.5}
      
      style="
        ::webkit-scrollbar-width:0px;
      "
    >
      <ElementData element={selectedElement} />
    </Modal>
  </div>
  {/if}
</Box>
