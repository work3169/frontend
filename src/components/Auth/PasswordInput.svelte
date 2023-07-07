<script lang="ts">
  export let name = "";
  export let value = "";
  export let placeholder = "";
  export let required = false;
  let className = "";
  export { className as class };
</script>

<input 
  type="password" 
  name={name}
  required={required}
  bind:value={value} 
  placeholder={placeholder} 
  class={className}
/>