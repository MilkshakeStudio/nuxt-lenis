import { onMounted } from "vue";
import { useState } from "#app";

export function useLenis() {
   const scrollState = useState("scrollState", () => null);
   const lenisVS = useState("lenisVS", () => null);

   const setScrollState = (newScrollState) => {
      scrollState.value = newScrollState;
   };
   const setLenis = (virtualScroll) => {
      lenisVS.value = virtualScroll;
   };
   onMounted(() => {
      console.log("USE LENIS");
   });
   return {
      scrollState,
      setScrollState,
      setLenis,
      lenis: lenisVS,
   };
}
