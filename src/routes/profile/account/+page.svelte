<script lang="ts">
  import HeaderContainer from "components/Profile/HeaderContainer.svelte";
  import { user as userStore } from "stores/user";

  console.log($userStore);
</script>

<HeaderContainer>
  <h1 class="font-medium text-2xl">Профиль</h1>
</HeaderContainer>
<div class="flex w-full mt-8">
  <div class="alert alert-success rounded-xl shadow-lg max-w-sm">
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span>Аккаунт верифицирован!</span>
    </div>
  </div>
</div>
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
    <div class="font-semibold">Реферальная ccылка</div>
    <a href={`https://${window.location.host}/auth/signup/?ref_link=${$userStore.user?.userprofile.ref_link}`}>https://{window.location.host}/auth/signup/?ref_link={$userStore.user?.userprofile.ref_link}</a>
  </div>
  <div class="flex flex-wrap gap-4">
    <a class="btn btn-primary" href="/profile/balance/replenish">Внести средства</a>
    <a class="btn btn-primary" href="/profile/balance/withdraw">Вывести средства</a>
  </div>
  <button class="btn btn-outline btn-secondary max-w-sm btn-sm" on:click={userStore.logout}>Выйти из аккаунта</button>
  <!-- <div class="mt-2 flex flex-col gap-4">
    <div>
      <label for="oldpass" class="label">
        <span class="label-text">Старый пароль</span>
      </label>
      <input name="oldpass" type="password" placeholder="Старый пароль" class="input input-bordered w-full max-w-xs" />
    </div>
    <div>
      <label for="newpass" class="label">
        <span class="label-text">Новый пароль</span>
      </label>
      <input name="newpass" type="password" placeholder="Новый пароль" class="input input-bordered w-full max-w-xs" />
    </div>
    <div>
      <label for="confirmpass" class="label">
        <span class="label-text">Подтвердите новый пароль</span>
      </label>
      <input name="confirmpass" type="password" placeholder="Подтвердите новый пароль" class="input input-bordered w-full max-w-xs" />  
    </div>
    <div>
      <button class="btn btn-primary">Поменять пароль</button>
    </div>
  </div> -->
</div>