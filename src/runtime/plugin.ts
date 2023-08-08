import { defineNuxtPlugin } from '#app'
// import Lenis from "@studio-freight/lenis";
import { useScrollState } from './composables/useScrollState'
import { Lenis } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  const { scrollState, setScrollState, setLenis } = useScrollState()

  nuxtApp.vueApp.provide('Lenis', Lenis)
  nuxtApp.vueApp.provide('setScrollState', setScrollState)
  nuxtApp.vueApp.provide('setLenis', setLenis)
  nuxtApp.vueApp.provide('scrollState', scrollState)
})
