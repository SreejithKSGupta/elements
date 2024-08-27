<script lang="ts">
  import { elements } from "$lib/db";
  import type { Element } from "$lib/types";
  import {Box,} from "@svelteuidev/core";
  import ElemementCard from "./ElemementCard.svelte";

  export let data: any;
  let property = data.series as keyof Element;
  let error = true;
  let elementsdata: Element[] = [];
  let filteredElements: Element[] = [];
  let mouseX = 0;
  let mouseY = 0;
  let backgroundColor = `rgb(14, 2, 66)`;
  let category = "";
  let phase = "";
  let block = "";
  let sortOrder = "asc";

  if (elements.length > 0 && property in elements[0]) {
    elementsdata = elements.filter((element) => element[property] != null);
    error = false;
  }

  const filterElements = () => {
    filteredElements = elementsdata
      .filter((element) => {
        return (
          (!category || element.category === category) &&
          (!phase || element.phase === phase) &&
          (!block || element.block === block)
        );
      })
      .sort((a, b) => {
        const aValue = a[property] as number | string;
        const bValue = b[property] as number | string;
        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
        } else if (typeof aValue === "string" && typeof bValue === "string") {
          return sortOrder === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        return 0;
      });
  };

  const handleMouseMove = (event: MouseEvent) => {
    mouseX = event.clientX / window.innerWidth;
    mouseY = event.clientY / window.innerHeight;
    updateBackgroundColor();
  };

  const updateBackgroundColor = () => {
    const r = Math.round(14 + mouseX * 40); 
    const g = Math.round(2 + mouseY * 20); 
    const b = Math.round(66 + (1 - mouseX) * 40); 
    backgroundColor = `linear-gradient(135deg, rgb(${r}, ${g}, ${b}), rgb(${b}, ${g}, ${r}))`;
  };

  if (typeof window !== "undefined") {
    window.addEventListener("mousemove", handleMouseMove);
    filterElements();
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
  "
>
  {#if !error}
    <h1 style="text-align: center; margin: 20px; color:white">
      {property} of Elements in the Periodic Table
    </h1>

    <!-- Filter Panel -->
    <div class="filter-panel">
      <div>
        <label for="phase">Phase:</label>
        <select id="phase" bind:value={phase} on:change={filterElements}>
          <option value="">All</option>
          <option value="Solid">Solid</option>
          <option value="Liquid">Liquid</option>
          <option value="Gas">Gas</option>
        </select>
      </div>

      <div>
        <label for="block">Block:</label>
        <select id="block" bind:value={block} on:change={filterElements}>
          <option value="">All</option>
          <option value="s">s</option>
          <option value="p">p</option>
          <option value="d">d</option>
          <option value="f">f</option>
        </select>
      </div>

      <div>
        <label for="sortOrder">Sort Order:</label>
        <select id="sortOrder" bind:value={sortOrder} on:change={filterElements}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>

    <Box
      style="
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    justify-content: center;
    padding: 20px;
    width: 100%;
  "
    >
      {#each filteredElements as element (element.symbol)}
         <ElemementCard element={element} property={property}/>
      {/each}
    </Box>
  {:else}
    <div style="text-align: center;">
      <h2>Please enter a valid property</h2>
    </div>
  {/if}
</Box>

<style>
  .filter-panel {
    margin: 20px;
    padding: 15px;
    border-radius: 10px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 80%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .filter-panel div {
    display: flex;
    flex-direction: column;
  }

  .filter-panel label {
    font-weight: bold;
    color: #ffffff;
    margin-bottom: 5px;
  }

  .filter-panel select {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    background-color: #fff;
    color: #333;
  }

  @media (max-width: 768px) {
    .filter-panel {
      width: 95%;
      grid-template-columns: 1fr;
    }
  }
</style>
