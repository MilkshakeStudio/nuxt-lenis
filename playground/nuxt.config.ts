import { defineNuxtConfig } from 'nuxt/config'
import MyModule from '..'

export default defineNuxtConfig({
  modules: [MyModule],

  myModule: {
    addPlugin: true
  },

  compatibilityDate: '2025-02-08'
})
