<script lang="ts">
  import Navbar from "../components/Navbar.svelte";
  import Hero from "../components/Landing/Hero.svelte";
  import LandingCardsGroup from "components/Landing/LandingCardsGroup.svelte";
  import LandingText from "components/Landing/LandingText.svelte";
  import LandingPerformanceSection from "components/Landing/LandingPerformanceSection.svelte";
  import ProjectProgress from "components/Landing/ProjectProgress.svelte";
  import Footer from "components/Footer.svelte";
  import CountupSection from "components/Landing/CountupSection.svelte";
  import CompanyLogos from "components/Landing/CompanyLogos.svelte";
  import FooterCta from "components/Landing/FooterCTA.svelte";
  import EcologyCards from "components/Landing/EcologyCards.svelte";
	import Investing from "components/Landing/Investing.svelte";
  import NewsSection from "components/Landing/NewsSection.svelte";
  import Testimonials from "components/Landing/Testimonials.svelte";


  let mainSection: HTMLElement;
  let productsSection: HTMLElement;
  let newsSection: HTMLElement;
  let reviewsSection: HTMLElement;
  let contractsSection: HTMLElement;
  let sections: { [key: string]: number } = {};
  let activeSection: string = 'mainSection';
  const handleScroll = () => {
    sections = {
      'mainSection': mainSection.offsetTop,
      'productsSection': productsSection.offsetTop,
      'newsSection': newsSection.offsetTop,
      'reviewsSection': reviewsSection.offsetTop,
      'contractsSection': contractsSection.offsetTop,
    };
    const scrollPosition: number = window.scrollY || window.pageYOffset;
    for (let section in sections) {
      if (sections[section] <= scrollPosition + 64) {
        activeSection = section;
      }
    }
  };
</script>

<svelte:window on:scroll={handleScroll} />
<Navbar  activeSection={activeSection} />

<div id="main" class="2xl:container 2xl:mx-auto" bind:this={mainSection}>
  <Hero />
</div>
<div class="container mx-auto">
  <LandingCardsGroup />
  <LandingText />
  <CountupSection />
  <div id="products" bind:this={productsSection}></div>
  <EcologyCards />
</div>

<div class="container mx-auto">
  <ProjectProgress />
</div>
<div class="container mx-auto my-24">
  <div id="news" bind:this={newsSection}></div>
  <NewsSection />
</div>
<div class="2xl:container 2xl:mx-auto">
  <LandingPerformanceSection />
</div>
<div class="container mx-auto my-24">
  <div id="reviews" bind:this={reviewsSection}></div>
  <Testimonials />
  <CompanyLogos />
</div>

<div class="container mx-auto">
  <div id="contracts" bind:this={contractsSection}></div>
  <Investing />
</div>

<FooterCta />
<Footer />

