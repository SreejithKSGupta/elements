<script lang="ts">
  import { onMount } from 'svelte';
  import ThreeDViewer from './ThreeDViewer.svelte';

  export let element: any = null;
  let loading = true;
  function copyToClipboard() {
    const currentURL =  window.location.hostname;
    const textToCopy = `${currentURL}/${element.name}`;

    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        console.log("Text copied to clipboard!");
      })
      .catch(err => {
        console.error("Failed to copy text: ", err);
      });
    }
  onMount(() => {
    setTimeout(() => {
      loading = false;
    }, 1400);
  });
</script>

<div id="modelcontent">
  {#if loading}
    <div class="loader-container">
      <div class="loader"></div>
    </div>
  {:else}
    <div class="container">
      <div class="card">
        <div class="image-and-details">
          <img src={element.image.url} alt={element.image.title} class="element-image" />
          <div class="details">
            <div class="detail-item">
              <strong>Name:</strong>
              <span>{element.name}</span>
            </div>
            <div class="detail-item">
              <strong>Symbol:</strong>
              <span>{element.symbol}</span>
            </div>
            <div class="detail-item">
              <strong>Category:</strong>
              <span>{element.category}</span>
            </div>
            <div class="detail-item">
              <strong>Atomic Number:</strong>
              <span>{element.number}</span>
            </div>
            <button on:click={copyToClipboard}>
              Share
            </button>
          </div>
        </div>
      </div>

      <div class="card">
        <h2 class="section-title">General Information</h2>
        <div class="details">
          <div class="detail-item">
            <strong>Atomic Number:</strong>
            <span>{element.number}</span>
          </div>
          <div class="detail-item">
            <strong>Atomic Mass:</strong>
            <span>{element.atomic_mass}</span>
          </div>
          <div class="detail-item">
            <strong>Phase:</strong>
            <span>{element.phase}</span>
          </div>
          <div class="detail-item">
            <strong>Density:</strong>
            <span>{element.density} g/L</span>
          </div>
          <div class="detail-item">
            <strong>Boiling Point:</strong>
            <span>{element.boil} K</span>
          </div>
          <div class="detail-item">
            <strong>Melting Point:</strong>
            <span>{element.melt} K</span>
          </div>
          <div class="detail-item">
            <strong>Molar Heat:</strong>
            <span>{element.molar_heat} J/mol·K</span>
          </div>
        </div>
      </div>

      <div class="card">
        <h2 class="section-title">Electron Configuration</h2>
        <div class="details">
          <div class="detail-item">
            <strong>Electron Configuration:</strong>
            <span>{element.electron_configuration}</span>
          </div>
          <div class="detail-item">
            <strong>Electron Affinity:</strong>
            <span>{element.electron_affinity} kJ/mol</span>
          </div>
          <div class="detail-item">
            <strong>Electronegativity:</strong>
            <span>{element.electronegativity_pauling}</span>
          </div>
          <div class="detail-item">
            <strong>Ionization Energies:</strong>
            <span>{element.ionization_energies.join(', ')} kJ/mol</span>
          </div>
          <div class="detail-item">
            <strong>Shells:</strong>
            <span>{element.shells.join(', ')}</span>
          </div>
        </div>
      </div>

      <div class="card">
        <h2 class="section-title">Additional Details</h2>
        <div class="details">
          <div class="detail-item">
            <strong>Discovered By:</strong>
            <span>{element.discovered_by}</span>
          </div>
          <div class="detail-item">
            <strong>Named By:</strong>
            <span>{element.named_by}</span>
          </div>
          <div class="detail-item">
            <strong>Summary:</strong>
            <span>{element.summary}</span>
          </div>
          <div class="detail-item">
            <a href={element.source} target="_blank">Wikipedia</a>
          </div>
        </div>
      </div>

      <div class="card">
        <h2 class="section-title">Bohr Model</h2>
        <div class="bohr-model-container">
          <ThreeDViewer modelUrl={element.bohr_model_3d} />
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  #modelcontent {
    width: 100%;
  }

  .loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .loader {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #3498db;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding: 20px;
  }

  .card {
    width: 100%;
    max-width: 800px;
    border: 1px solid #e0e0e0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 16px;
    background-color: rgba(10, 17, 54, 0.822);
  }

  .image-and-details {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .element-image {
    width: 256px;
    border-radius: 8px;
  }

  .details {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }

  .detail-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 7px;

  }

  .detail-item strong {
    width: 50%;
    flex-shrink: 0;
  }

  .detail-item span {
   width: 50%;
    text-align: left;
  }

  .section-title {
    color: #4b0082;
    margin-bottom: 8px;
  }

  .bohr-model-container {
    width: 100%;
  }

  a {
    color: blue;
    text-decoration: underline;
  }

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}
  button:hover {
    background-color: #45a049;
  }

  button:active {
    background-color: #3e8e41;
  }

</style>
