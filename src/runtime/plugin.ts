import { defineNuxtPlugin } from '#app'
import { reactive, ref } from 'vue'
import type { LenisOptions, ScrollCallback, Scrolling } from 'lenis'
import { Lenis } from '#imports'
// TODO: move to another file
export type ScrollState = {
   scroll: number;
   animatedScroll: number;
   velocity: number;
   limit: number;
   progress: number;
   isScrolling: Scrolling;
   isStopped: boolean;
   isTouching?: boolean;
   isHorizontal: boolean;
   isLocked: boolean;
   isSmooth: boolean;
   rootElement: HTMLElement | null;
   direction: 1 | -1 | 0;
   lastVelocity: number;
   targetScroll: number;
};
export interface LenisPlugin {
   createLenis: (id: string, options?: LenisOptions) => Lenis;
   getLenis: (id?: string) => Lenis | null;
   destroyLenis: (id: string) => void;
   getScrollState: (id?: string) => ScrollState | null;
}

export default defineNuxtPlugin((nuxtApp) => {
  // Centralized storage for Lenis instances and their scroll states
  const instances = reactive(new Map<string, Lenis>())
  const scrollStates = reactive(new Map<string, ScrollState>())
  const defaultInstance = ref<string | null>(null)

  const createLenis = (id: string, options: LenisOptions = {}) => {
    if (instances.has(id)) {
      console.warn(`[Lenis] Instance with ID "${id}" already exists.`)
      return instances.get(id)
    }

    const lenis = new Lenis(options)
    // CUSTOM RAF
    // if (!options.autoRaf) {
    //    const raf = (time) => {
    //       lenis.raf(time);
    //       requestAnimationFrame(raf);
    //    };
    //    requestAnimationFrame(raf);
    // }
    instances.set(id, lenis)

    // Initialize scroll state
    scrollStates.set(id, {
      scroll: 0,
      animatedScroll: 0,
      velocity: 0,
      progress: 0,
      limit: 0,
      isScrolling: false,
      isStopped: true,
      isTouching: false,
      isHorizontal: false,
      isLocked: false,
      isSmooth: false,
      rootElement: null,
      direction: 1,
      lastVelocity: 0,
      targetScroll: 0
    })

    // Update scroll state on scroll
    lenis.on('scroll', (scrollData: Lenis) => {
      scrollStates.set(id, {
        limit: scrollData.limit,
        animatedScroll: scrollData.animatedScroll,
        scroll: scrollData.scroll,
        velocity: scrollData.velocity,
        progress: scrollData.progress,
        isScrolling: scrollData.isScrolling,
        isStopped: scrollData.isStopped,
        isTouching: scrollData.isTouching,
        isHorizontal: scrollData.isHorizontal,
        isLocked: scrollData.isLocked,
        isSmooth: scrollData.isSmooth,
        rootElement: scrollData.rootElement,
        direction: scrollData.direction,
        lastVelocity: scrollData.lastVelocity,
        targetScroll: scrollData.targetScroll
      })
    })

    // Automatically set as default instance
    if (!defaultInstance.value) {
      defaultInstance.value = id
    }

    return lenis
  }

  const getLenis = (id?: string) => {
    const targetId = id || defaultInstance.value
    if (!targetId || !instances.has(targetId)) {
      console.warn(`[Lenis] No instance found for ID "${targetId}".`)
      return null
    }

    return instances.get(targetId)
  }

  const destroyLenis = (id: string) => {
    if (!instances.has(id)) {
      console.warn(`[Lenis] No instance found for ID "${id}".`)
      return
    }
    instances.get(id)?.destroy()
    instances.delete(id)
    scrollStates.delete(id)

    if (defaultInstance.value === id) {
      defaultInstance.value =
            instances.size > 0 ? Array.from(instances.keys())[0] : null
    }
  }

  const getScrollState = (id?: string): ScrollState | null => {
    const targetId = id || defaultInstance.value
    return scrollStates.get(targetId) || null
  }

  nuxtApp.provide('lenis', {
    createLenis,
    getLenis,
    destroyLenis,
    getScrollState
  })
})
