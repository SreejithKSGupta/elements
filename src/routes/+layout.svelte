<script>
   import "../app.css";
   import { SvelteUIProvider } from '@svelteuidev/core';
   import Header from "./header.svelte"
</script>


<SvelteUIProvider themeObserver="dark">
	<Header/>
<slot/>
</SvelteUIProvider>

