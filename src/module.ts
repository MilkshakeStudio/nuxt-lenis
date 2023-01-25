import { fileURLToPath } from "url";
import {
   addComponent,
   defineNuxtModule,
   addPlugin,
   createResolver,
} from "@nuxt/kit";

export interface ModuleOptions {
   addPlugin: boolean;
}

export default defineNuxtModule<ModuleOptions>({
   meta: {
      name: "@nuxt-lenis",
      configKey: "nuxtLenis",
   },
   defaults: {
      addPlugin: true,
   },
   setup(options, nuxt) {
      //  if (options.addPlugin) { }
      const { resolve } = createResolver(import.meta.url);
      const runtimeDir = fileURLToPath(new URL("./runtime", import.meta.url));
      nuxt.options.build.transpile.push(runtimeDir);
      addPlugin(resolve(runtimeDir, "plugin"));
      addComponent({
         name: "lenis", // name of the component to be used in vue templates
         filePath: resolve(runtimeDir, "components", "lenis.vue"), // resolve(runtimeDir, 'components', 'MyComponent.vue')
      });
   },
});
