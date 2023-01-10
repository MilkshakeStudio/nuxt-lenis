<template>
   <div ref="lenisContent">
      <slot />
   </div>
</template>
<script>
import { defineComponent, ref, onMounted, onBeforeUnmount, inject } from "vue";

export default defineComponent({
   props: ["options"],
   setup({options}) {
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
            lenisVS.on(
               "scroll",
               ({ scroll, limit, velocity, direction, progress }) => {
                  console.log({ scroll, limit, velocity, direction, progress });
               }
            );
            requestAnimationFrame(raf);
         }
      });

      onBeforeUnmount(() => {
         if (!lenisVS) return;
         lenisVS.destroy();
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
