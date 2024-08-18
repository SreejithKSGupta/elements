<script>
    import { Group, Image, Title, Anchor, Space } from '@svelteuidev/core';
  </script>
  
  <header>

      <Group align="center" spacing="xs">
        <Image src="/favicon.webp" alt="Logo" radius={100} width={"5vh"} height={"5vh"} />
        <Title color={"white"} order={1}>Period</Title>
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
        background-color: rgb(30, 3, 56);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0px  30px;
        cursor: pointer;
    }
  </style>