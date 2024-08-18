<script lang="ts">
  import ElementModel from "../components/ElementModel.svelte";
  export let data: any;
  import { Box } from '@svelteuidev/core';
  let backgroundColor = `rgb(14, 2, 66)`;
  let mouseX = 0;
  let mouseY = 0;



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
    color: white;
  "
>{#if data.elementData}
   <ElementModel element={data.elementData}/>

{:else}
  <div>
    <h1>{data.error}</h1>
  </div>
{/if}
</Box>

