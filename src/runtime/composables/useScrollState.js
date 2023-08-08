import { readonly } from 'vue'
import { useState } from '#app'

export function useScrollState (initialState = false) {
  const scrollState = useState('scrollState', () => initialState)
  const lenisVS = useState('lenisVS', () => initialState)

  const setScrollState = (newScrollState) => {
    scrollState.value = newScrollState
  }
  const setLenis = (virtualScroll) => {
    lenisVS.value = virtualScroll
  }

  return {
    scrollState: readonly(scrollState),
    setScrollState,
    setLenis
  }
}
