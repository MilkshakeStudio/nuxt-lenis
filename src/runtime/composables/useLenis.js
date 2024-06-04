import { useState } from "#app";
// import { computed } from "#imports";

export function useLenis() {
   const scrollState = useState("scrollState", () => []);
   const lenisVS = useState("lenisVS", () => []);
   const ids = useState("ids", () => []);

   const setScrollState = (newScrollState, id) => {
      scrollState.value[id] = newScrollState;
   };
   const setLenis = (virtualScroll, id) => {
      lenisVS.value[id] = virtualScroll;
      ids.value.push(id);
   };

   // const getScrollState = computed(() => {
   //    return scrollState.value.length >= 1
   //       ? scrollState
   //       : scrollState.value[ids.value[0]];
   // });

   // const getLenis = computed(() => {
   //    return lenisVS.value.length >= 1 ? lenisVS : lenisVS.value[ids.value[0]];
   // });
   return {
      scrollState: scrollState,
      lenis: lenisVS,
      setScrollState,
      setLenis,
   };
}
