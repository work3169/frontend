<script>
  import NavbarAuth from "components/Auth/NavbarAuth.svelte";
  import Footer from "components/Footer.svelte";

  export let title = "//";
  export let img1 = "/infobase/geo1.webp";
  export let img2 = "/infobase/geo2.webp";
  export let text1 = "";
  export let text2 = "";
</script>

<NavbarAuth />
  <div class="p-2 md:p-0 w-full max-w-4xl mx-auto">
    <img class="w-full mt-1 " src={img1} alt="image1" />
    <div class="flex flex-wrap justify-between mt-1 mb-8">
      <div class="text-gray-400">
        Длительность чтения: 3 мин
      </div>
      <div>
        <div class="badge badge-outline">
          Энергетика
        </div>
        <div class="badge badge-outline">
          Инновации
        </div>
      </div>
    </div>

    <h1 class="text-4xl font-semibold my-4">{title}</h1>
   
    <slot name="text1" />

    <img class="w-full my-8" src={img2} alt="image2" />

    <slot name="text2" />

    <a class="btn btn-outline my-8" href="/#products">На главную</a> 
  </div>
<Footer />
