import { useNuxtApp } from '#app'
import { watch } from 'vue'
import type { LenisPlugin } from '../plugin'

export function useLenis () {
  const lenis = useNuxtApp().$lenis as LenisPlugin

  if (!lenis) {
    throw new Error('[Lenis] Lenis is not provided.')
  }

  const watchScrollState = (callback: (state: any) => void, id?: string) => {
    watch(
      () => lenis.getScrollState(id),
      (state) => {
        if (state) { callback(state) }
      },
      { deep: true, immediate: true }
    )
  }

  return {
    createLenis: lenis.createLenis,
    getLenis: lenis.getLenis,
    destroyLenis: lenis.destroyLenis,
    scrollState: lenis.getScrollState,
    watchScrollState
  }
}
