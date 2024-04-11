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
      scrollState,
      lenis: lenisVS,
      setScrollState,
      setLenis,
   };
}
