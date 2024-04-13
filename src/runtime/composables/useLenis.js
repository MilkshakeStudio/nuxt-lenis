import { useState } from "#app";

export function useLenis() {
   const scrollState = useState("scrollState", () => []);
   const lenisVS = useState("lenisVS", () => []);

   const setScrollState = (newScrollState, id) => {
      scrollState.value[id] = newScrollState;
   };
   const setLenis = (virtualScroll,  id) => {
      lenisVS.value[id] = virtualScroll;
   };

   return {
      scrollState: scrollState.length > 1 scrollState, scrollState.value[0],
      lenis: lenisVS.length > 1 lenisVS, lenisVS.value[0],
      setScrollState,
      setLenis,
   };
}
