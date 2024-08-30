<script lang="ts">
    export let referral: any = {};

    let isOpened = false;

    function toggle() {
        isOpened = !isOpened
    }
</script>

<tr>
    <td class="sticky left-0">{referral.username}</td>
    <td>{referral.contracts_count}</td>
    <td>${Math.ceil(+referral.contracts_value)}</td>
    <td>${Math.ceil(+referral.profit)}</td>
    <td>{referral.level}</td>
    <td>
        {#if referral.referrals?.length}
            <button class={`btn btn-outline ${isOpened ? '' : 'btn-primary'}`} on:click={toggle}>{isOpened ? 'Скрыть дочерние реферралы' : 'Показать дочерние реферралы'}</button>
        {/if}
    </td>
  </tr>

  {#if referral.referrals?.length && isOpened}
    {#each referral.referrals as subReferral}
      <tr>
        <td class="sticky left-0">{subReferral.username}</td>
        <td>{subReferral.contracts_count}</td>
        <td>${Math.ceil(+subReferral.contracts_value)}</td>
        <td>${Math.ceil(+subReferral.profit)}</td>
        <td>{subReferral.level}</td>
        <td>{referral.username}</td> <!-- Здесь отображаем имя родительского пользователя -->
      </tr>
      
      {#if subReferral.referrals?.length}
        {#each subReferral.referrals as subSubReferral}
          <tr>
            <td class="sticky left-0">{subSubReferral.username}</td>
            <td>{subSubReferral.contracts_count}</td>
            <td>${Math.ceil(+subSubReferral.contracts_value)}</td>
            <td>${Math.ceil(+subSubReferral.profit)}</td>
            <td>{subSubReferral.level}</td>
            <td>{subReferral.username}</td> <!-- Здесь отображаем имя родительского пользователя -->
          </tr>
        {/each}
      {/if}

    {/each}
  {/if}