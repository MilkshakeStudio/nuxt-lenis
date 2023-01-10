import { defineNuxtPlugin } from "#app";
import Lenis from "@studio-freight/lenis";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.provide("Lenis", Lenis);
});
