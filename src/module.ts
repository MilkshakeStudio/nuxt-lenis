import {
   addComponent,
   defineNuxtModule,
   addPlugin,
   createResolver,
   addImports,
} from "@nuxt/kit";

export interface ModuleOptions {
   addPlugin: boolean;
}

export default defineNuxtModule<ModuleOptions>({
   meta: {
      name: "@milkshake/nuxt-lenis",
      configKey: "lenis",
      compatibility: {
         nuxt: "^3.0.0",
      },
   },
   defaults: {
      addPlugin: true,
   },
   setup(options, nuxt) {
      const { resolve } = createResolver(import.meta.url);
      addImports([
         {
            name: "default",
            as: "Lenis",
            from: "@studio-freight/lenis",
         },
      ]);
      addPlugin(resolve("./runtime/plugin"));

      addImports([
         {
            name: "useLenis",
            as: "useLenis",
            from: resolve("./runtime/composables/useLenis"),
         },
      ]);

      addComponent({
         name: "Lenis", // name of the component to be used in vue templates
         filePath: resolve("./runtime/components", "Lenis.vue"), // resolve(runtimeDir, 'components', 'MyComponent.vue')
      });
   },
});
