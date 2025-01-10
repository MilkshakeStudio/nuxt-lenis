import { useNuxtApp } from "#app";

import { watch, reactive, ref, computed } from "vue";

interface ScrollState {
   scroll: number;
   velocity: number;
   progress: number;
   isScrolling: boolean;
   direction: number;
}

const defaultScrollState: ScrollState = {
   scroll: 0,
   velocity: 0,
   progress: 0,
   isScrolling: false,
   direction: 0,
};

const scrollStates = reactive<Record<string, Ref<ScrollState>>>({});
const lenisInstances = reactive<Record<string, any>>({});
const defaultInstance = ref<string | null>(null);

export function useLenis(callback: Function, instanceId: string) {
   const { $lenis } = useNuxtApp();

   if (!$lenis) {
      throw new Error("Lenis plugin is not initialized correctly.");
   }

   const updateDefaultInstance = () => {
      const remainingIds = Object.keys(lenisInstances);
      defaultInstance.value = remainingIds.length ? remainingIds[0] : null;
   };

   const createLenis = (id: string, options: any) => {
      if (!lenisInstances[id]) {
         const instance = $lenis.createLenis(id, options);
         lenisInstances[id] = instance;

         if (!defaultInstance.value) {
            defaultInstance.value = id;
         }
      }

      return lenisInstances[id];
   };

   const destroyLenis = (id: string) => {
      if (lenisInstances[id]) {
         $lenis.destroyLenis(id);
         delete lenisInstances[id];
         delete scrollStates[id];
         updateDefaultInstance();
      }
   };

   const setScrollState = (id: string, state: ScrollState) => {
      if (!scrollStates[id]) {
         scrollStates[id] = ref(state);
      } else {
         scrollStates[id].value = state;
      }
   };

   const getScrollState = computed(() => {
      const targetId = defaultInstance.value;

      if (!targetId || !scrollStates[targetId]?.value) {
         console.warn(
            `[Lenis] No valid scroll state found for ID "${targetId}". Falling back to default scroll state.`
         );
         return { ...defaultScrollState };
      }

      return scrollStates[targetId].value;
   });

   const getLenisInstance = (id?: string) => {
      const targetId = id || defaultInstance.value;

      if (!targetId || !lenisInstances[targetId]) {
         console.warn(
            `[Lenis] No valid Lenis instance found for ID "${id}". Returning a placeholder object.`
         );
         return {};
      }

      return lenisInstances[targetId];
   };

   // remove callback
   const removeCallback = () => {
      if (callback) {
         const activeInstance = getLenisInstance(
            instanceId ?? defaultInstance.value
         );
         activeInstance?.off("scroll", callback);
      }
   };

   // watcher to setup callbacks on initial load
   watch(defaultInstance, () => setupCallbacks());
   // callback setup“
   const setupCallbacks = () => {
      console.log("setupCallbacks");
      if (callback) {
         const activeInstance = getLenisInstance(
            instanceId ?? defaultInstance.value
         );
         activeInstance?.on("scroll", callback);
      }
   };

   return {
      createLenis,
      destroyLenis,
      setScrollState,
      getScrollState,
      getLenisInstance,
      removeCallback,
   };
}
