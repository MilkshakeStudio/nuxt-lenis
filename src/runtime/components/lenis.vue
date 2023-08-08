<template>
   <div ref="lenisContent">
      <slot />
   </div>
</template>

<script>
import {
   defineComponent,
   ref,
   onMounted,
   onBeforeUnmount,
   inject,
   onUpdated,
} from "vue";
export default defineComponent({
   props: ["options"],
   setup({ options }, { emit }) {
      const Lenis = inject("Lenis");
      const setScrollState = inject("setScrollState");
      const setLenis = inject("setLenis");
      const lenisVS = ref(0);
      const lenisContent = ref(null);
      /**
       * Starting options - for full list of options visit https://github.com/studio-freight/lenis
       */
      const lenisOptions = Object.assign(
         {},
         {
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: "vertical",
            gestureDirection: "vertical",
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
         },
         options || {}
      );
      // On mounted set new Lenis instance
      onMounted(() => {
         initLenis();
      });
      // Destroy on unmount
      onBeforeUnmount(() => {
         destroyLenis();
      });

      onUpdated(() => {
         if (!lenisVS.value) return;
         lenisVS.value.off("scroll");
         lenisVS.value.destroy();
         lenisVS.value = new Lenis();
      });
      const initLenis = () => {
         if (process.client) {
            lenisVS.value = new Lenis();
            lenisVS.value.on("scroll", (scrollData) => {
               setScrollState(scrollData);
               emit("scroll", scrollData);
            });
            setLenis(lenisVS.value);
            emit("initiated", { lenis: lenisVS.value });
            requestAnimationFrame(raf);
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
html {
   scroll-behavior: initial;
}
html,
body {
   min-height: 100%;
   height: auto;
}
</style>
