<script lang="ts">
  import HeaderContainer from "components/Profile/HeaderContainer.svelte";
  import { user as userStore } from "stores/user";
  let isHowItWorksOpened = false
</script>

<HeaderContainer>
  <h1 class="font-medium text-2xl">Профиль</h1>
</HeaderContainer>
{#if $userStore.user.userprofile.account_status == 0}
<div class="flex w-full mt-8">
  <div class="alert alert-success rounded-xl shadow-lg max-w-sm">
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span>Аккаунт верифицирован!</span>
    </div>
  </div>
</div>
{:else if $userStore.user.userprofile.account_status == 1}
<div class="flex w-full mt-8">
  <div class="alert alert-warning rounded-xl shadow-lg max-w-md">
    <div>
      <span>Обратитесь в поддержку для верификации личности</span>
    </div>
  </div>
</div>
{:else if $userStore.user.userprofile.account_status == 2}
<div class="flex w-full mt-8">
  <div class="alert alert-error rounded-xl shadow-lg max-w-sm">
    <div>
      <span>Наложены временные ограничения</span>
    </div>
  </div>
</div>
{/if}
<div class="mt-8 flex flex-col gap-4 bg-neutral-50 shadow-md p-4 rounded-xl max-w-2xl">
  <div class="flex flex-wrap gap-2">
    <div>
      <div class="font-semibold">Имя</div>
      <div>{$userStore.user?.first_name}</div>
    </div>
  </div>
  <div>
    <div>
      <div class="font-semibold">Фамилия</div>
      <div>{$userStore.user?.first_name}</div>
    </div>
  </div>
  <div>
    <div class="font-semibold">Электронная почта</div>
    <div>{$userStore.user?.email}</div>
  </div>
  <div>
    <div class="font-semibold flex flex-col md:flex-row justify-start items-start md:items-center">
      <span>Реферальная ccылка</span>
      <button class="btn btn-sm btn-outline md:ml-2" on:click={() => (isHowItWorksOpened = true)}>Как это работает?</button>
    </div>
    <a href={`https://${window.location.host}/auth/signup/?ref_link=${$userStore.user?.userprofile.ref_link}`}>https://{window.location.host}/auth/signup/?ref_link={$userStore.user?.userprofile.ref_link}</a>
   {#if isHowItWorksOpened}
    <div class="prose my-4">
      <h3>Условия Реферальных Наград:</h3>
      <p>При каждом открытии нового контракта через вашу реферальную ссылку, вы имеете право на следующие процентные выплаты:</p>
      <ul>
        <li>1. Первая линия: 5% от суммы первоначального вложения, сделанного новым инвестором, который зарегистрировался через вашу ссылку.</li>
        <li>2. Вторая линия: 3% от суммы первоначального вложения, сделанного новым инвестором, который был привлечен вашими инвесторами первой линии.</li>
        <li>3. Третья линия: 2% от суммы первоначального вложения, сделанного новым инвестором, который был привлечен вашими инвесторами второй линии.</li>
      </ul>
      <h3>Индивидуальные Условия:</h3>
      <p>
        Мы также хотели бы подчеркнуть, что в случае вашей выдающейся активности и успешных реферальных усилиях, мы оставляем за собой право предложить вам индивидуальные условия и бонусы. Это наше способ признать ваш вклад в рост нашего фонда и вознаградить вас соответствующим образом.
      </p>
    </div>
   {/if}
  </div>
  <div>
    <a class="font-semibold my-3 text-secondary" href="https://t.me/geef_support">Обратиться в поддержку</a>
  </div>


  <div class="flex flex-wrap gap-4">
    <a class="btn btn-primary" href="/profile/balance/replenish">Внести средства</a>
    <a class="btn btn-primary" href="/profile/balance/withdraw">Вывести средства</a>
  </div>
  <button class="btn btn-outline btn-secondary max-w-sm btn-sm" on:click={userStore.logout}>Выйти из аккаунта</button>
</div>