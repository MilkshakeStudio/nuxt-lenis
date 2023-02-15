import { defineNuxtPlugin } from "#app";
import Lenis from "@studio-freight/lenis";
import { useScrollState } from './composables/scrollState'

export default defineNuxtPlugin((nuxtApp) => {
   const [scrollState, setScrollState] = useScrollState();
   
   nuxtApp.vueApp.provide("Lenis", Lenis);
   nuxtApp.vueApp.provide("setScrollState", setScrollState);
   nuxtApp.vueApp.provide("scrollState", scrollState);
});
