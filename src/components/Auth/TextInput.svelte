<script lang="ts">
  export let name = "";
  export let value = "";
  export let placeholder = "";
  export let required = false;
  export let disabled = false;
  let className = "";
  export { className as class };
</script>

<input 
  type="text" 
  name={name}
  bind:value={value} 
  required={required}
  placeholder={placeholder}
  class={className}
  disabled={disabled}
/>