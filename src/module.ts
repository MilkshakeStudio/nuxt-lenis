import { fileURLToPath } from "url";
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
      name: "@nuxt-lenis",
      configKey: "nuxtLenis",
      compatibility: {
         nuxt: "^3.0.0",
      },
   },
   defaults: {
      addPlugin: true,
   },
   async setup(options, nuxt) {
      //  if (options.addPlugin) { }
      const { resolve } = createResolver(import.meta.url);
      const runtimeDir = fileURLToPath(new URL("./runtime", import.meta.url));
      nuxt.options.build.transpile.push(runtimeDir);

    
      addImports([
         {
            name: "default",
            as: "Lenis",
            from: "@studio-freight/lenis",
         },
         // { name: 'useScrollState', as: 'useScrollState', from: join(runtimeDir, 'composables') },
      ]);

      addPlugin(resolve(runtimeDir, "plugin"));
      addComponent({
         name: "lenis", // name of the component to be used in vue templates
         filePath: resolve(runtimeDir, "components", "lenis.vue"), // resolve(runtimeDir, 'components', 'MyComponent.vue')
      });
   },
});
