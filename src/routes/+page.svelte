<script lang="ts">
  import Navbar from "../components/Navbar.svelte";
  import HeroSection from "components/NewLanding/HeroSection.svelte";
  import Footer from "components/Footer.svelte";
  import InfoBlock from "components/NewLanding/InfoBlock.svelte";
  import Faq from "components/NewLanding/Faq.svelte";
  import InvestmentCarousel from "components/NewLanding/InvestmentCarousel.svelte";
  import Possibilities from "components/NewLanding/Possibilities.svelte";
  import ProfitCalculator from "components/NewLanding/ProfitCalculator.svelte";
  import Reviews from "components/NewLanding/Reviews.svelte";
  import InvestmentInfo from "components/NewLanding/InvestmentInfo.svelte";
  import FutureProjects from "components/NewLanding/FutureProjects.svelte";
  import InvestText from "components/NewLanding/InvestText.svelte";
  import WorldMap from "components/NewLanding/WorldMap.svelte";
  import WhatWeDo from "components/NewLanding/WhatWeDo.svelte";
  import SupportIcon from "components/Landing/SupportIcon.svelte";
  

import InvestmentPercent from "components/NewLanding/InvestmentPercent.svelte";
	
</script>

<div class="background-animation">
  <div class="circle circle-1"></div>
  <div class="circle circle-2"></div>
  <div class="circle circle-3"></div>
  <div class="circle circle-4"></div>
</div>

 
  <Navbar activeSection={''} />


<HeroSection />
<WorldMap />
<InvestmentPercent />
<InvestmentCarousel />
<Possibilities />
<WhatWeDo />
<!-- <ProfitCalculator /> -->
<InfoBlock />
<Faq />
<InvestmentInfo />
<FutureProjects />
<InvestText />
<Reviews />
<SupportIcon />



<footer>
  <Footer />
</footer>


<style>
  :global(html),
  :global(body) {
    margin: 0;
    padding: 0;
    height: 100%; /* Устанавливаем полную высоту для html и body */
    overflow-x: hidden; /* Убираем горизонтальную прокрутку */
  }

  :global(body) {
    background: linear-gradient(to right, #4E8D8D, #6DA0A0, #8EB3B3, #AFC6C6); /* Градиентный фон */
    
    font-family: Arial, sans-serif;
  }

  

  /* Анимированные кружочки */
  .background-animation {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none; /* Чтобы кружочки не мешали взаимодействию */
    z-index: 0;
  }

  .circle {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1); /* Полупрозрачный белый */
    animation: float 10s infinite ease-in-out;
  }

  .circle-1 {
    width: 180px;
    height: 180px;
    top: 10%;
    left: 20%;
    animation-delay: 0s;
  }

  .circle-2 {
    width: 1160px;
    height: 1160px;
    top: 50%;
    right: 10%;
    animation-delay: 2s;
  }

  .circle-3 {
    width: 1100px;
    height: 1100px;
    bottom: 20%;
    left: 30%;
    animation-delay: 4s;
  }

  .circle-4 {
    width: 140px;
    height: 140px;
    bottom: 10%;
    right: 20%;
    animation-delay: 6s;
  }

  /* Анимация "плавания" */
  @keyframes float {
    0% {
      transform: translateY(0) scale(1);
    }
    50% {
      transform: translateY(-20px) scale(1.1);
    }
    100% {
      transform: translateY(0) scale(1);
    }
  }
</style>