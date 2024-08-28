<script lang="ts">
   import "../app.css";
   import { SvelteUIProvider } from "@svelteuidev/core";
   import Header from "./components/header.svelte";
   import SEO from "./components/Seo.svelte";
   let backgroundColor = `rgb(14, 2, 66)`;
   let isPortrait = false;
   let mouseX = 0;
   let mouseY = 0;
   const checkOrientation = () => {
      isPortrait = window.innerHeight > window.innerWidth;
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
      checkOrientation();
      window.addEventListener("resize", checkOrientation);
      window.addEventListener("mousemove", handleMouseMove);
   }
</script>
<SvelteUIProvider themeObserver="dark">
   <div id="mainbody" style=" background: {backgroundColor};">
<SEO />
{#if isPortrait}
   <div class="portrait-warning">
      <div class="rotate-icon">🔄</div>
      Please rotate your device to landscape mode.
   </div>
{:else}
  
      
         <Header />
         <div id="contentbody">
            <slot />
         </div>
   

{/if}
</div>
</SvelteUIProvider>
<style>
   #mainbody {
      height: 100vh;
      width: 100vw;
   }

   #contentbody {
      height: 90vh;
      width: 100vwr;
      overflow-y:scroll;
      color: white   ;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      
   }

   .portrait-warning {
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
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
