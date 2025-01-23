import { Lenis, useLenis } from "#imports";
import { defineNuxtPlugin } from "#app";
import { reactive, ref } from "vue";
import type { LenisOptions } from "lenis";

export default defineNuxtPlugin((nuxtApp) => {
   // Centralized storage for Lenis instances and their scroll states
   const instances = reactive(new Map<string, Lenis>());
   const scrollStates = reactive(new Map<string, any>());
   const defaultInstance = ref<string | null>(null);

   const createLenis = (id: string, options: LenisOptions = {}) => {
      if (instances.has(id)) {
         console.warn(`[Lenis] Instance with ID "${id}" already exists.`);
         return instances.get(id);
      }

      const lenis = new Lenis(options);
      instances.set(id, lenis);

      // Initialize scroll state
      scrollStates.set(id, {
         scroll: 0,
         velocity: 0,
         progress: 0,
         isScrolling: false,
         direction: "vertical",
      });

      // Update scroll state on scroll
      lenis.on("scroll", (scrollData: any) => {
         scrollStates.set(id, { ...scrollStates.get(id), ...scrollData });
      });

      // Automatically set as default instance
      if (!defaultInstance.value) {
         defaultInstance.value = id;
      }

      return lenis;
   };

   const getLenis = (id?: string) => {
      const targetId = id || defaultInstance.value;
      if (!targetId || !instances.has(targetId)) {
         console.warn(`[Lenis] No instance found for ID "${targetId}".`);
         return null;
      }
      return instances.get(targetId);
   };

   const destroyLenis = (id: string) => {
      if (!instances.has(id)) {
         console.warn(`[Lenis] No instance found for ID "${id}".`);
         return;
      }
      instances.get(id)?.destroy();
      instances.delete(id);
      scrollStates.delete(id);

      if (defaultInstance.value === id) {
         defaultInstance.value =
            instances.size > 0 ? Array.from(instances.keys())[0] : null;
      }
   };

   const getScrollState = (id?: string) => {
      const targetId = id || defaultInstance.value;
      return scrollStates.get(targetId) || null;
   };

   nuxtApp.provide("lenis", {
      createLenis,
      getLenis,
      destroyLenis,
      getScrollState,
   });
});
