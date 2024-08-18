<script>
    import { Seo } from '@svelteuidev/core';
  
    const title = 'Period';
    const description = 'Explore the periodic table with interactive features, including 3D Bohr views of atoms and detailed element data.';
    const imageUrl = '/favicon.webp';
    const siteUrl = 'https://elements-bmeh.vercel.app/'; 
  </script>
  
  <Seo
    title={title}
    titleTemplate="%t% | Sreejith's Periodic Table"
    description={description}
    canonical={siteUrl}
    openGraph={{
      url: siteUrl,
      type: 'website',
      title,
      description,
      images: [
        {
          url: imageUrl,
          alt: 'Periodic Table Project',
          width: 1200,
          height: 630,
        },
      ],
      site_name: "Sreejith's Periodic Table",
    }}
    twitter={{
      cardType: 'summary_large_image',
      title,
      description,
      image: imageUrl,
      imageAlt: 'Periodic Table Project',
    }}
  />
  