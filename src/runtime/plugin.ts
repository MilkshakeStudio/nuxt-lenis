import { defineNuxtPlugin } from "#app";
import { Lenis, useLenis } from "#imports";

export default defineNuxtPlugin((nuxtApp) => {
   const { scrollState, setScrollState, setLenis, lenis } = useLenis();

   nuxtApp.vueApp.provide("Lenis", Lenis);
   nuxtApp.vueApp.provide("setScrollState", setScrollState);
   nuxtApp.vueApp.provide("setLenis", setLenis);
   nuxtApp.vueApp.provide("scrollState", scrollState);
   nuxtApp.vueApp.provide("lenis", lenis);
});
