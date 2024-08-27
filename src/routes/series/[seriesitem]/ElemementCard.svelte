<script lang="ts">
   import {
    Card,
    Text,
    Badge,
    Box,
    Group,
    Image,
    Button,
  } from "@svelteuidev/core";

  export let element : any ;
  export let property: any ;

  function gotoelement(element: string) {
    const baseUrl = `${window.location.protocol}//${window.location.host}`;
    window.location.href = `${baseUrl}/${element}`;
  }
</script>

<Card shadow="sm" padding="sm" m="sm" withBorder style="border-radius:10px;">
    <Card.Section>
      <Image
        src={element.image?.url || element.bohr_model_image}
        alt={element.name}
        width="100%"
        height="300px"
      />
    </Card.Section>
   <Box style="display: flex; flex-direction:column ; justify-content:space-evenly; align-items:center; padding:10px width:100%" >
    <Group position="apart">
      <Text weight={500}>{element.name} ({element.symbol})</Text>
      <Badge color="blue" variant="light">
        {element.category}
      </Badge>
    </Group>

    <Box >
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
        </Box>
        <Button style=" width:90%" on:click={() => gotoelement(element.name)}>Details</Button>
    </Box>
  </Card>