<script context="module" lang="ts">
  import * as PDFJS from "pdfjs-dist";
  PDFJS.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.mjs`;
</script>

<script lang="ts">
  import { onMount } from "svelte";

  let canvas: HTMLCanvasElement;
  export let src: URL | ArrayBuffer;

  onMount(() => {
    let destroyHook = () => {};
    PDFJS.getDocument(src).promise.then(async (pdf) => {
      destroyHook = async () => {
        await pdf.cleanup();
        await pdf.destroy();
      };

      console.log("PDF has", pdf.numPages, "pages");
      var pageNumber = 1;

      let page = await pdf.getPage(pageNumber);

      var scale = 1.5;
      var viewport = page.getViewport({ scale: scale });
      var context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;

     
      var renderTask = page.render({
        canvasContext: context!,
        viewport: viewport
      });
  

      renderTask.promise.then(function () {
        console.log("Page rendered");
      });
    });

    return () => {
      destroyHook();
    };
  });
</script>

<div>
  <canvas bind:this={canvas} />
  {src}
</div>
