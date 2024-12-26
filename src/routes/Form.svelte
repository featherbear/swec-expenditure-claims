<script lang="ts">
  import Pdf from "$lib/components/Pdf.svelte";
  import type { AttachmentUploadRequestType } from "$lib/types/AttachmentUploadRequest";
  import type { ExpenseType } from "$lib/types/ExpenseType";
  import ExpenseCategories from "$lib/values/ExpenseCategories";
  import { xxhash128 } from "hash-wasm";

  let form: Partial<
    ExpenseType & {
      files: FileList;
    }
  > = {};

  let states: { gst_enabled: boolean } = {
    gst_enabled: false,
  };

  let oldCost = form.cost;
  $: {
    if (oldCost !== form.cost) {
      updateGSTValue();
    }
    oldCost = form.cost;
  }

  function updateGSTValue() {
    if (!states.gst_enabled) {
      form.gst = undefined;
      return;
    }

    let result = form.cost! / 11;
    if (!isNaN(result)) {
      form.gst = result;
    }
  }

  // Upload API
  function requestUpload(request: AttachmentUploadRequestType) {
    return fetch("TODO: SOME ADDRESS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        body: JSON.stringify(request),
      },
    });
  }
</script>

{JSON.stringify(form)}
<div>
  <div>
    <div class="max-w-sm">Supplier</div>
    <!-- TODO: Show previously used entries from same form -->
  </div>
  <div>
    Description

    <input
      type="text"
      placeholder="Description"
      class="input input-bordered w-full max-w-xs"
      bind:value={form.description}
    />
  </div>
  <div>
    Price

    <label class="input input-bordered flex items-center gap-2">
      <!-- TODO: Dollar image -->
      <input
        type="number"
        class="grow"
        placeholder="Cost"
        bind:value={form.cost}
        min={0}
      />
    </label>
  </div>
  <div>
    <input
      type="checkbox"
      class="toggle"
      bind:checked={states.gst_enabled}
      on:change={updateGSTValue}
    />
  </div>
  <div>
    GST
    <!-- TODO: Dollar image -->
    <input
      type="number"
      class="grow"
      placeholder="GST"
      bind:value={form.gst}
      min={0}
      max={form.cost! / 11 || 0}
      disabled={!states.gst_enabled}
    />
  </div>

  <div>
    Expense Code

    <select
      class="select select-bordered w-full max-w-xs"
      bind:value={form.category}
    >
      <option value={undefined} disabled selected>Select Expense Code</option>
      {#each Object.entries(ExpenseCategories) as [key, obj]}
        <option value={key}>{key} - {obj.description}</option>
      {/each}
    </select>
  </div>

  <div>
    {#if form.files && form.files.length > 0}
      <div>
        Add files
        <div>
          <input
            type="file"
            multiple
            accept=".pdf,image/*"
            bind:files={form.files}
          />
        </div>
      </div>
      {#each form.files as f}
        <!-- TODO: Duplicate check via hash + size -->
        <div>
          {f.type}
          {f.name}
          <!--  ({f.size} bytes)  -->
          <div>
            {#await f.arrayBuffer() then bytes}
              {#await xxhash128(new Uint8Array(bytes))}
                hashing
              {:then hash}
                hash is {hash}
              {/await}
              Content
              {#if f.type == "application/pdf"}
                <Pdf src={bytes} />
              {/if}
            {/await}
          </div>
        </div>
      {/each}
    {:else}
      <div>
        No file selected PLS
        <input
          type="file"
          multiple
          accept=".pdf,image/*"
          bind:files={form.files}
        />
      </div>
    {/if}
  </div>
</div>
