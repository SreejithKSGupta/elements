<script lang="ts">
    import { Box, Text } from "@svelteuidev/core";
    export let element: any = null;
    export let show: (element: any) => void; 
</script>

<Box
    style="
      grid-column: {element.xpos}; 
      grid-row: {element.ypos}; 
      background-color: #{element['cpk-hex'] || 'ffffff'};
      display: flex; 
      flex-direction: column; 
      justify-content: center; 
      align-items: center;
      cursor: pointer;
      border-radius: 5px;
      padding: 0.2rem;
    "
    on:click={() => show(element)}
>
    <Text align="left" size="sm" weight="bold" color="white" style="width: 100%; text-align: left;">
        {Math.round(element.atomic_mass)}
    </Text>
    <Text align="center" color='black' size="xl" weight="bold" style="text-align: center;" >
        {element.symbol}
    </Text>
    <Text align="right" size="sm" weight="bold" color="white" style="width: 100%; text-align: right;">
        {element.number}
    </Text>
</Box>
