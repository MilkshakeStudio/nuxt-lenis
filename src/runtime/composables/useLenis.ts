import { useState } from "#app";
import { computed, reactive } from "#imports";
import { ref, readonly } from "vue";

const lenisVS: Object = {};
// const scrollState: Object = {};
const ids: Array<Number> = [];
export function useLenis(single: Boolean = true): Object {
   const scrollState = useState("scrollState", () => []);

   const setScrollState = (newScrollState: Object, id: String | Number) => {
      // NOTE: This is a workaround because of how useState can't handle classes
      scrollState.value[id] = Object.assign(
         {},
         {
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
         }
      );
   };
   const setLenis = (virtualScroll: Object, id: String | Number) => {
      lenisVS[id] = virtualScroll;
      ids.push(id);
   };

   const getScrollState = computed(() => {
      return single ? scrollState.value[ids[0]] : scrollState.value;
   });

   const getLenis = computed(() => {
      return single ? lenisVS[ids[0]] : lenisVS;
   });

   const getLenisInstance = (id) => {
      if (!id) return "no id provided";
      return lenisVS[id];
   };

   return {
      scrollState: getScrollState,
      lenis: getLenis.value,
      lenisInstance: getLenisInstance,
      setScrollState,
      setLenis,
   };
}
