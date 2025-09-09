<template>
   <div ref="lenisContainer" :id="id">
      <slot />
   </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useNuxtApp } from "#app";

const { $lenis } = useNuxtApp();
const props = defineProps({
   id: {
      type: String,
      default: "default",
   },
   root: {
      type: Boolean,
      default: true,
   },
   options: {
      type: Object,
      default: () => ({
         smooth: true,
         duration: 1.2,
         autoRaf: true,
         direction: "vertical",
      }),
   },
   onScroll: Function,
});

const lenisContainer = ref<HTMLElement | null>(null);

onMounted(() => {
   if (!lenisContainer.value) {
      console.warn("[Lenis] lenisContainer is not available.");
      return;
   }

   // Create the Lenis instance via the plugin

   const options = Object.assign({ autoRaf: true }, props.options, {
      wrapper: props.root ? window : lenisContainer.value,
   });

   const lenisInstance = $lenis.createLenis(props.id, options);

   // Attach scroll callback if provided
   if (props.onScroll) {
      lenisInstance?.on("scroll", props.onScroll);
   }
});

onBeforeUnmount(() => {
   const { $lenis } = useNuxtApp();
   // Destroy the Lenis instance via the plugin
   // $lenis.destroyLenis(props.id);
});
</script>

<style scoped>
html.lenis,
html.lenis body {
   height: auto;
}

.lenis.lenis-smooth {
   scroll-behavior: auto !important;
}

.lenis.lenis-stopped {
   overflow: hidden;
}
</style>
