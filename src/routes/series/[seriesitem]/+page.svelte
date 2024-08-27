<script lang="ts">
  import { elements } from "$lib/db";
  import type { Element } from "$lib/types";
  import { Card, Text, Badge, Box, Group, Image, Button } from "@svelteuidev/core";

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
    elementsdata = elements
      .filter((element) => element[property] != null)
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
    error = false;
  }

  const filterElements = () => {
    filteredElements = elementsdata.filter((element) => {
      return (
        (!category || element.category === category) &&
        (!phase || element.phase === phase) &&
        (!block || element.block === block)
      );
    });
  };

  const handleMouseMove = (event: MouseEvent) => {
    mouseX = event.clientX / window.innerWidth;
    mouseY = event.clientY / window.innerHeight;
    updateBackgroundColor();
  };

  const updateBackgroundColor = () => {
    const r = Math.round(14 + mouseX * 40); // Range from 14 to 54 (blue)
    const g = Math.round(2 + mouseY * 20); // Range from 2 to 22 (purple/indigo)
    const b = Math.round(66 + (1 - mouseX) * 40); // Range from 66 to 106 (indigo/blue)
    backgroundColor = `linear-gradient(135deg, rgb(${r}, ${g}, ${b}), rgb(${b}, ${g}, ${r}))`;
  };

  if (typeof window !== "undefined") {
    window.addEventListener("mousemove", handleMouseMove);
    filterElements();
  }

  function gotoelement(element: string) {
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  window.location.href = `${baseUrl}/${element}`;
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
    <h1 style="text-align: center; margin-bottom: 20px; color:white">
      {property} of Elements in the Periodic Table
    </h1>

    <!-- Filter Panel -->
    <div class="filter-panel">
      <div>
        <label for="category">Category:</label>
        <select id="category" bind:value={category} on:change={filterElements}>
          <option value="">All</option>
          <option value="metal">Metal</option>
          <option value="nonmetal">Nonmetal</option>
          <option value="metalloid">Metalloid</option>
        </select>
      </div>

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
        Sort Order
        <label>
          <input
            type="radio"
            name="sortOrder"
            value="asc"
            checked={sortOrder === "asc"}
            on:change={() => {
              sortOrder = "asc";
              filterElements();
            }}
          />
          Ascending
        </label>
        <label>
          <input
            type="radio"
            name="sortOrder"
            value="desc"
            checked={sortOrder === "desc"}
            on:change={() => {
              sortOrder = "desc";
              filterElements();
            }}
          />
          Descending
        </label>
      </div>
    </div>

    <Box
      style="
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly
  "
    >
      {#each filteredElements as element (element.symbol)}
        <Card shadow="sm" padding="sm" m="sm" style="width: 300px;">
          <Card.Section>
            <Image
              src={element.image?.url || element.bohr_model_image}
              alt={element.name}
              width="300px"
              height="300px"
            />
          </Card.Section>

          <Group position="apart" style="padding: 5px;">
            <Text weight={500}>{element.name} ({element.symbol})</Text>
            <Badge color="blue" variant="light">
              {element.category}
            </Badge>
          </Group>

          <Text size="sm">
            <strong>Discovered by:</strong>
            {element.discovered_by || "Unknown"}
          </Text>

          <Text size="sm">
            <strong>{property}:</strong>
            {element[property]}
          </Text>

          <Text size="sm">
            <strong>Atomic Mass:</strong>
            {element.atomic_mass} u
          </Text>

          <Text size="sm">
            <strong>Density:</strong>
            {element.density} g/cm³
          </Text>

          <Text size="sm">
            <strong>Phase at STP:</strong>
            {element.phase}
          </Text>

          <Card.Section style="margin-top: 15px;">
            <Text size="xs" color="dimmed" align="center">
              <button on:click={()=>gotoelement(element.name)}>Details</button>
            </Text>
          </Card.Section>
        </Card>
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
    padding: 10px;
    background-color: #f8f9fa;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .filter-panel select,
  .filter-panel input[type="radio"] {
    margin-right: 10px;
  }

  .filter-panel label {
    margin-right: 10px;
  }
</style>
