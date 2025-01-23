import { useNuxtApp } from "#app";
import { watch } from "vue";

export function useLenis() {
   const lenis = inject("lenis");

   if (!lenis) {
      throw new Error("[Lenis] Lenis is not provided.");
   }

   const watchScrollState = (id: string, callback: (state: any) => void) => {
      watch(
         () => getScrollState(id),
         (state) => {
            if (state) callback(state);
         },
         { deep: true, immediate: true }
      );
   };

   return {
      createLenis: lenis.createLenis,
      getLenis: lenis.getLenis,
      destroyLenis: lenis.destroyLenis,
      getScrollState: lenis.getScrollState,
      watchScrollState,
   };
}
