<script>
    import { Group, Image, Text, Anchor, Space } from '@svelteuidev/core';
    function gotohome(){
      console.log("hello")
  }
  </script>

  <header>

      <Group align="center" spacing="xs" style="cursor: pointer;" >
        <Image src="/favicon.webp" alt="Logo" radius={100} on:click={gotohome} width={"5vh"} height={"5vh"} />
        <Text color={"white"} size="xl" on:click={gotohome}>Period</Text>
      </Group>
      <Group spacing="xs">
        <Anchor style="color:white; text-decoration:none;"  href="https://www.linkedin.com/in/sreejith-k-s-gupta/" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </Anchor>
        <Anchor style="color:white; text-decoration:none;" href="https://github.com/SreejithKSGupta" target="_blank" rel="noopener noreferrer">
          Github
        </Anchor>
      </Group>
  </header>
  
  <style>
    header{
        height: 10vh;
        width: 100vw;
        background-color: rgba(1, 71, 73, 0.281);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0px  30px;
        
    }
  </style>