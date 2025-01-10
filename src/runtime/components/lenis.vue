<template>
   <div :id="wrapperId" ref="lenisWrapper">
      <slot />
   </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from "#imports";
import { useLenis } from "#imports";

const props = defineProps({
   id: {
      type: String,
      default: "",
   },
   options: {
      type: Object,
      default: () => ({
         smooth: true,
         duration: 1.2,
         direction: "vertical",
      }),
   },
   root: {
      type: Boolean,
      default: true,
   },
});

const lenisWrapper = ref<HTMLElement | null>(null);
const lenisInstance = ref<any>(null);

// Generate a unique ID if none is provided
const wrapperId = computed(
   () => props.id || `lenis-${Math.random().toString(36).substr(2, 9)}`
);

const { createLenis, destroyLenis, setScrollState } = useLenis();

// Initialize Lenis
const initLenis = () => {
   lenisInstance.value = createLenis(wrapperId.value, {
      ...props.options,
      wrapper: props.root ? undefined : lenisWrapper.value,
   });

   lenisInstance.value.on(
      "scroll",
      ({ scroll, velocity, progress, isScrolling, direction }) =>
         setScrollState(wrapperId.value, {
            scroll,
            velocity,
            progress,
            isScrolling,
            direction,
         })
   );

   // Start the Lenis animation loop
   const raf = (time: number) => {
      lenisInstance.value?.raf(time);
      requestAnimationFrame(raf);
   };
   requestAnimationFrame(raf);
};

// Cleanup Lenis
const cleanupLenis = () => {
   if (lenisInstance.value) {
      lenisInstance.value.destroy();
      destroyLenis(wrapperId.value);
      lenisInstance.value = null;
   }
};

// Lifecycle hooks
onMounted(initLenis);
onBeforeUnmount(cleanupLenis);
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
