<script lang="ts">
  import { elements } from "$lib/db";
  import type { Element,Propertyname } from "$lib/types";
  import {Box,} from "@svelteuidev/core";
  import ElemementCard from "./ElemementCard.svelte";
  let propertyname: Propertyname = {
    atomic_mass: "Atomic Mass ",
    boil: "Boiling point",
    density: "Density",
    melt: "Melting Point",
    molar_heat: "Molar Heat",
    number: "Atomic Number",
    electron_affinity: "Electron Affinity",
    electronegativity_pauling:"Electronegativity",
    ionization_energies: "Ionization Energies"

    }
    

  export let data: any;
  let property = data.series as keyof Element;
  let error = true;
  let elementsdata: Element[] = [];
  let filteredElements: Element[] = [];


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
  if (typeof window !== "undefined") {
    filterElements();
  }

  function copyToClipboard() {
    const textToCopy =  window.location.href;

    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        alert("Text copied to clipboard!");
      })
      .catch(err => {
        console.error("Failed to copy text: ", err);
      });
    }
</script>

<div class="contentbox" >
      
  {#if !error}
    <h1 style="text-align: center; padding:15px; color:white; height:5vh;">
      {propertyname[property]} of Elements in the Periodic Table <button on:click={copyToClipboard}>Share</button>
    </h1>
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
    height: 80vh;
    overflow:scroll;
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
  </div>

<style>

   .contentbox {
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
    align-items: center; 
    width: 100vw; 
    min-height: 90vh; 
  }
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

  button {
    outline: none;
    border: none;
    border-radius: 5px;
    padding: 6px 10px;
    margin: 5px;
    background-color: rgba(19, 255, 19, 0.582);
    color: rgb(255, 255, 255);
  }
</style>
