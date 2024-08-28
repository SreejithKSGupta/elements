<script lang="ts">
    export let element: any = null;
    export let show: (element: any) => void; 
</script>

<div
  class="elementbox"
  role="button"
  style="
    grid-column: {element.xpos}; 
    grid-row: {element.ypos}; 
    background-color: #{element['cpk-hex'] || 'ffffff'};"
  on:click={() => show(element)}
  tabindex="0"
  on:keydown={(event) => event.key === 'Enter' && show(element)}
>
    <h3 class="atomic-mass">
        {Math.round(element.atomic_mass)}
    </h3>
    <h1 class="element-symbol">
        {element.symbol}
    </h1>
    <h3 class="element-number">
        {element.number}
    </h3>
</div>

<style>
    .elementbox {
      display: flex; 
      flex-direction: column; 
      justify-content: center; 
      align-items: center;
      cursor: pointer;
      border-radius: 5px;
      padding: 0.2rem;
    }

    .atomic-mass {
        width: 100%;
      text-align: left;
      color: white;
      font-weight: bold;
      font-size: 60%;
    }

    .element-symbol {
        width: 100%;
      text-align: center;
      color: black;
      font-weight: bold;
      font-size: 80%;
    }

    .element-number {
      width: 100%;
      text-align: right;
      color: white;
      font-weight: bold;
      font-size: 60%;
    }

    @media (max-height: 500px) {
      .elementbox {
        padding: 0.1rem;
      }
    }
</style>
