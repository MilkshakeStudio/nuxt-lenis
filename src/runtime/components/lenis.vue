<template>
   <div ref="lenisContent">
      <slot />
   </div>
</template>

<script>
import {
   computed,
   defineComponent,
   inject,
   onBeforeUnmount,
   onMounted,
   onUpdated,
   ref,
   watch,
} from "vue";

export default defineComponent({
   props: ["options"],
   setup(props, { emit }) {
      const Lenis = inject("Lenis");
      const setScrollState = inject("setScrollState");
      const setLenis = inject("setLenis");
      const lenisVS = ref(0);
      const lenisRaf = ref(null);
      const lenisContent = ref(null);

      /**
       * Starting options - for full list of options visit https://github.com/studio-freight/lenis
       */
      const lenisOptions = computed(() => {
         return {
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: "vertical",
            gestureDirection: "vertical",
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
            ...props.options,
         };
      });

      // On mounted set new Lenis instance
      onMounted(() => {
         if (lenisOptions.value.content) {
            lenisOptions.value.content = document.querySelector(
               lenisOptions.value.content
            );
         }
         if (lenisOptions.value.wrapper) {
            lenisOptions.value.wrapper = document.querySelector(
               lenisOptions.value.wrapper
            );
         }
         initLenis();
      });

      // Destroy on unmount
      onBeforeUnmount(() => {
         destroyLenis();
      });

      onUpdated(() => {
         if (!lenisVS.value) return;
         if (!lenisOptions.value.autoResize) lenisVS.value.resize();
      });

      watch(lenisOptions, (newVal) => {
         if (!lenisVS.value) return;
         destroyLenis();
         initLenis();
      });

      const initLenis = () => {
         if (process.client) {
            lenisVS.value = new Lenis(lenisOptions.value);
            lenisVS.value.on("scroll", (scrollData) => {
               setScrollState(scrollData);
               emit("scroll", scrollData);
            });
            setLenis(lenisVS.value);
            emit("initiated", { lenis: lenisVS.value });
            lenisRaf.value = requestAnimationFrame(raf);
         } else {
            throw new Error("Process Client is false");
         }
      };

      const raf = (time) => {
         if (!lenisVS.value) return;
         lenisVS.value.raf(time);
         requestAnimationFrame(raf);
      };

      const destroyLenis = () => {
         if (!lenisVS.value) return;
         setScrollState(false);
         lenisVS.value.off("scroll");
         lenisVS.value.destroy();
         cancelAnimationFrame(lenisRaf.value);
      };

      return {
         destroyLenis,
         initLenis,
         lenisContent,
         lenisVS,
      };
   },
});
</script>

<style>
html.lenis {
   height: auto;
}

.lenis.lenis-smooth {
   scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
   overscroll-behavior: contain;
}

.lenis.lenis-stopped {
   overflow: hidden;
}

.lenis.lenis-scrolling iframe {
   pointer-events: none;
}
</style>
