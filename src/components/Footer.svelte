<footer class="footer gap-12 justify-start flex flex-col-reverse md:flex-row p-10 bg-neutral text-neutral-content w-full">
  <div class="w-full md:w-auto text-center md:text-left">
  <p>© 2021 DES LTD - ALL RIGHTS RESERVED</p>
  <p class="text-[12px]">Support email: support-contact@logistico.com</p>
  </div>
  <div class="w-full md:w-auto text-center md:text-right">
  <a href="/static/terms" class="mr-4 hover:underline">Правила пользования</a>
  <button
  on:click={openPDF}
  class="hover:underline bg-transparent border-none text-neutral-content cursor-pointer"
  >
  СЕРТИФИКАТ
  </button>
  </div>
  </footer>
  
  <script>
  function openPDF() {
  window.open('/static/certificate.pdf', '_blank');
  }
  </script>