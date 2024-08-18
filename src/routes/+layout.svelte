<script>
   import "../app.css";
   import { SvelteUIProvider } from "@svelteuidev/core";
   import Header from "./header.svelte";

   let isPortrait = false;

   const checkOrientation = () => {
      if (typeof window !== "undefined") {
         isPortrait = window.innerHeight > window.innerWidth;
      }
   };

   if (typeof window !== "undefined") {
      checkOrientation();
      window.addEventListener("resize", checkOrientation);
   }
</script>

{#if isPortrait} 
   <div class="portrait-warning">
      <div class="rotate-icon">🔄</div>
      Please rotate your device to landscape mode.
   </div>
{:else}
   <SvelteUIProvider themeObserver="dark">
      <Header />
      <slot />
   </SvelteUIProvider>
{/if}

<style>
   .portrait-warning {
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      text-align: center;
      color: white;
      padding: 20px;
      font-size: 1.5rem;
      background-color: rgb(1, 1, 61);
   }

   .rotate-icon {
      font-size: 3rem;
      margin-bottom: 20px;
      animation: rotate 1s linear infinite;
   }

   @keyframes rotate {
      0% {
         transform: rotate(0deg);
      }
      50% {
         transform: rotate(130deg);
      }
      100% {
         transform: rotate(0deg);
      }
   }
</style>
