<script lang="ts">
  import { Card, Badge, Loader, Center, Flex, Box, Text, Image, Grid } from '@svelteuidev/core';
  import { onMount } from 'svelte';
  import ThreeDViewer from './ThreeDViewer.svelte';

  export let element: any = null;
  let loading = true;

  onMount(() => {
    setTimeout(() => {
      loading = false;
    }, 1400);
  });
</script>

<div id="modelcontent">

{#if loading}
  <Center style="height: 100%;">
    <Loader size="xl" variant="bars" />
  </Center>
{:else}
  <Box p={6}>
    <Flex justify="space-between" align="center" mb={6} >
      <Text size="xl" weight="bold" color="gray">{element.symbol}</Text>
      <Text size="xl" weight="bold" color="dark">{element.name}</Text>
      <Badge color="indigo" variant="filled" radius="md" size="lg">{element.category}</Badge>
    </Flex>

    <Center>
      <Image src={element.image.url} alt={element.image.title} width={256} radius="md"  />
    </Center>

    <Grid cols={1} mt={6}>
      <Card withBorder shadow="lg" radius="md" p="lg">
        <Text size="lg" weight="bold" color="indigo" mb="sm">General Information</Text>
        <Text><strong>Atomic Number:</strong> {element.number}</Text>
        <Text><strong>Atomic Mass:</strong> {element.atomic_mass}</Text>
        <Text><strong>Phase:</strong> {element.phase}</Text>
        <Text><strong>Density:</strong> {element.density} g/L</Text>
        <Text><strong>Boiling Point:</strong> {element.boil} K</Text>
        <Text><strong>Melting Point:</strong> {element.melt} K</Text>
        <Text><strong>Molar Heat:</strong> {element.molar_heat} J/mol·K</Text>
      </Card>

      <Card withBorder shadow="lg" radius="md" p=4 mt={6}>
        <Text size="lg" weight="bold" color="indigo" mb="sm">Electron Configuration</Text>
        <Text><strong>Electron Configuration:</strong> {element.electron_configuration}</Text>
        <Text><strong>Electron Affinity:</strong> {element.electron_affinity} kJ/mol</Text>
        <Text><strong>Electronegativity:</strong> {element.electronegativity_pauling}</Text>
        <Text><strong>Ionization Energies:</strong> {element.ionization_energies.join(', ')} kJ/mol</Text>
        <Text><strong>Shells:</strong> {element.shells.join(', ')}</Text>
      </Card>

      <Card withBorder shadow="lg" radius="md"  p=4 mt={6}>
        <Text size="lg" weight="bold" color="indigo" mb="sm">Additional Details</Text>
        <Text><strong>Discovered By:</strong> {element.discovered_by}</Text>
        <Text><strong>Named By:</strong> {element.named_by}</Text>
        <Text><strong>Summary:</strong> {element.summary}</Text>
        <Text>
          <a href={element.source} target="_blank" style="color: blue; text-decoration: underline;">Wikipedia</a>
        </Text>
      </Card>
    </Grid>


    <Card withBorder shadow="lg" radius="md" p=4 mt={6}>
      <Text size="lg" weight="bold" color="indigo" mb="sm">Bohr Model</Text>
        <Box style="width: 100%;">
          <ThreeDViewer modelUrl={element.bohr_model_3d} />
        </Box>
     
    </Card>
  </Box>
{/if}
</div>

<style>

  #modelcontent{
    width:100%;
  }
</style>