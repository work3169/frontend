<script>
  import TextInput from "./TextInput.svelte";
  import EmailInput from "./EmailInput.svelte";
  import PasswordInput from "./PasswordInput.svelte";
  export let type = "text";
  export let name = "";
  export let value = "";
  export let placeholder = "";
  export let label = "label";
  export let error = "";
  export let disabled = false;
  let tsClass = ""
  $: tsClass = `input input-bordered w-full max-w-md ${!!error ? "input-error" : ""} ${!!disabled ? "!bg-white" : ""}`;
</script>

<div class="mb-1">
  <label class="label pb-1" for={name}>
    <span class="label-text">{label}</span>
  </label>
  {#if type === 'text'}
    <TextInput {disabled} {name} bind:value={value} {placeholder} class={tsClass} />
  {:else if type === 'email'}
    <EmailInput {name} bind:value={value} {placeholder} class={tsClass} />
  {:else if type === 'password'}
    <PasswordInput {name} bind:value={value} {placeholder} class={tsClass} />
  {/if}

  {#if error}
    <label class="label" for={name}>
      <span class="label-text-alt text-error">{error}</span>
    </label>
  {/if}
</div>
