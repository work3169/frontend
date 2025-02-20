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
  

import InvestmentPercent from "components/NewLanding/InvestmentPercent.svelte";
	
</script>



<Navbar activeSection={''} />


<HeroSection />
<WorldMap />
<InvestmentPercent />
<InvestmentCarousel />
<Possibilities />
<ProfitCalculator />
<InfoBlock />
<Faq />
<InvestmentInfo />
<FutureProjects />
<InvestText />
<Reviews />


<footer>
  <Footer />
</footer>