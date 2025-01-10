import { Lenis, useLenis } from "#imports";
import { defineNuxtPlugin } from "#app";
import { reactive } from "vue";

export default defineNuxtPlugin(() => {
   const instances = reactive(new Map<string, Lenis>());

   const createLenis = (id: string, options: Record<string, any>) => {
      if (instances.has(id)) {
         console.warn(`Lenis instance with ID "${id}" already exists.`);
         return instances.get(id);
      }

      const lenis = new Lenis(options);
      instances.set(id, lenis);
      return lenis;
   };

   const getLenis = (id: string) => instances.get(id) || null;

   const destroyLenis = (id: string) => {
      const lenis = instances.get(id);
      if (!lenis) {
         console.warn(`No Lenis instance found with ID "${id}".`);
         return;
      }
      lenis.destroy();
      instances.delete(id);
   };

   return {
      provide: {
         lenis: {
            createLenis,
            getLenis,
            destroyLenis,
         },
      },
   };
});
