<template>
   <div ref="lenisContent">
      <slot />
   </div>
</template>
<script>
import { defineComponent, ref, onMounted, onBeforeUnmount, inject, onUpdated } from "vue";

export default defineComponent({
   props: ["options"],
   setup({ options }, { emit }) {
      const Lenis = inject("Lenis");
      var lenisVS = null;
      const lenisContent = ref(null);
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

      onMounted(() => {
         if (process.client) {
            lenisVS = new Lenis();
            lenisVS.on("scroll", (scrollData) => emit("scroll", scrollData));
            requestAnimationFrame(raf);
         }
      });

      onBeforeUnmount(() => {
         if (!lenisVS) return;
         lenisVS.off("scroll");
         lenisVS.destroy();
      });

      onUpdated(() => {
         if (!lenisVS) return;
         console.log(onUpdated);
         lenisVS.off("scroll");
         lenisVS.destroy();
         lenisVS = new Lenis();
      });

      const raf = (time) => {
         if (!lenisVS) return;
         lenisVS.raf(time);
         requestAnimationFrame(raf);
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
