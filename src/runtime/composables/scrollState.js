import { readonly } from "vue";
import { useState } from "#app";

export function useScrollState(initialState = false) {
   const scrollState = useState("scrollState", () => initialState);

   const setScrollState = (newScrollState) => {
      scrollState.value = newScrollState;
   };

   return [readonly(scrollState), setScrollState];
}
