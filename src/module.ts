import { fileURLToPath } from 'url'
import {
  addComponent,
  defineNuxtModule,
  addPlugin,
  createResolver,
  addImports
} from '@nuxt/kit'

export interface ModuleOptions {
   addPlugin: boolean;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxt-lenis',
    configKey: 'nuxtLenis',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  defaults: {
    addPlugin: true
  },
  async setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    addImports([
      {
        name: 'default',
        as: 'Lenis',
        from: '@studio-freight/lenis'
      }
    ])
    addImports([
      {
        name: 'useScrollState',
        as: 'useScrollState',
        from: resolve('./runtime/composables/useScrollState')
      }
    ])

    addPlugin(resolve('./runtime/plugin'))
    addComponent({
      name: 'lenis', // name of the component to be used in vue templates
      filePath: resolve('./runtime/components', 'lenis.vue') // resolve(runtimeDir, 'components', 'MyComponent.vue')
    })
  }
})
