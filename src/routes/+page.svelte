<script lang="ts">
   import { elements } from '$lib/db';
  import ElementData from './components/ElementModel.svelte';
  import Elementbox from './components/elementbox.svelte';
  import { Box, Modal } from '@svelteuidev/core';
  import { scale } from 'svelte/transition';

  let selectedElement: any = null;
  let isModalOpen = false;

  let mouseX = 0;
  let mouseY = 0;
  let backgroundColor = `rgb(14, 2, 66)`;

  function showDetails(element: any): void {
    selectedElement = element;
    isModalOpen = true;
  }

  function closeModal() {
    isModalOpen = false;
  }

  const handleMouseMove = (event: MouseEvent) => {
    mouseX = event.clientX / window.innerWidth;
    mouseY = event.clientY / window.innerHeight;
    updateBackgroundColor();
  };

  const updateBackgroundColor = () => {
    const r = Math.round(14 + mouseX * 40);  // Range from 14 to 54 (blue)
    const g = Math.round(2 + mouseY * 20);   // Range from 2 to 22 (purple/indigo)
    const b = Math.round(66 + (1 - mouseX) * 40);  // Range from 66 to 106 (indigo/blue)
    backgroundColor = `linear-gradient(135deg, rgb(${r}, ${g}, ${b}), rgb(${b}, ${g}, ${r}))`;
  };

  // Add the mousemove event listener when the component mounts
  if (typeof window !== "undefined") {
    window.addEventListener('mousemove', handleMouseMove);
  }
</script>

<Box 
  style="
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
    align-items: center; 
    width: 100vw; 
    min-height: 90vh; 
    background: {backgroundColor};
    transition: background 0.2s ease;
    padding: 3vh;
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
      size="full" 
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