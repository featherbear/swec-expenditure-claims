<script>

  import Form from "./Form.svelte";

 let a = 3;

</script>
<!-- <h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p> -->
a
<button onclick={() => a = a+1}>a</button>
{a}


Bulk Edit mode, display as table
<Form />