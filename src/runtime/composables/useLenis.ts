import { useState } from "#app";
import { computed } from "#imports";

var lenisVS: Array<Object | Function> = [];

export function useLenis(single: Boolean = true): Object {
   const scrollState = useState("scrollState", () => []);
   // const lenisVS = useState("lenisVS", () => []);
   const ids = useState("ids", () => []);

   const setScrollState = (newScrollState: Object, id: String | Number) => {
      scrollState.value[id] = {
         className: newScrollState?.className,
         isHorizontal: newScrollState?.isHorizontal,
         isLocked: newScrollState?.isLocked,
         isScrolling: newScrollState?.isScrolling,
         isSmooth: newScrollState?.isSmooth,
         isStopped: newScrollState?.isStopped,
         limit: newScrollState?.limit,
         progress: newScrollState?.progress,
         rootElement: newScrollState?.rootElement,
         scroll: newScrollState?.scroll,
         direction: newScrollState?.direction,
         time: newScrollState?.time,
         animatedScroll: newScrollState?.animatedScroll,
         velocity: newScrollState?.velocity,
         lastVelocity: newScrollState?.lastVelocity,
         targetScroll: newScrollState?.targetScroll,
      };
   };
   const setLenis = (virtualScroll: Object, id: String | Number) => {
      lenisVS[id] = virtualScroll;
      ids.value.push(id);
   };
   const getScrollState = computed(() => {
      return single ? scrollState.value[ids.value[0]] : scrollState.value;
   });
   const getLenis = computed(() => {
      return single ? lenisVS[ids.value[0]] : lenisVS;
   });
   return {
      scrollState: single ? getScrollState : getScrollState.value,
      lenis: single ? getLenis : getLenis.value,
      setScrollState,
      setLenis,
   };
}
