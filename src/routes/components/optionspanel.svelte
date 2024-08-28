<script lang="ts">
let items = [
    { path: '/atomic_mass', label: 'Atomic Mass' },
    { path: '/boil', label: 'Boiling Point' },
    { path: '/density', label: 'Density' },
    { path: '/melt', label: 'Melting Point' },
    { path: '/molar_heat', label: 'Molar Heat' },
    { path: '/number', label: 'Atomic Number' },
    { path: '/electron_affinity', label: 'Electron Affinity' },
    { path: '/electronegativity_pauling', label: 'Electro negativity' },
    { path: '/ionization_energies', label: 'Ionization' },
];


  function handleClick(seriesname: string) {
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      window.location.href = `${baseUrl}/series${seriesname}`;
    }
</script>

<div class="container">
  {#each items as item}
    <button data-link={item.path} 
            on:click={()=>handleClick(item.path)}>
      {item.label}
    </button>
  {/each}
</div>

<style>
    .container {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        width: 90vw;
    }
    button {
      background-color: rgba(16, 201, 214, 0.192);
      font-size: small;
      padding: 8px 12px;
      outline: none;
      border-radius: 5px;
      color: white;
      border: none;
      cursor: pointer;
      font-weight: bold;
      width: 10%;
      transition: 100ms linear;
    }
    button:hover {
      font-size: 99%;
      background-color: rgb(4, 58, 80);
    }
      
    @media (max-height: 500px) {
      button {
        font-size: 70%;
        padding: 3px 5px;
      }
    }
</style>