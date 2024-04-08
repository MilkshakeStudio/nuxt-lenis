# Nuxt Lenis

This is a Nuxt wrapper for [Lenis](https://lenis.studiofreight.com/) by [Studio Freight](https://studiofreight.com/). Thank them for the incredible tool.

## Getting Started

1. `yarn add nuxt-lenis`
2. Add `@milkshake/nuxt-lenis` to your modules in nuxt.config
3. In your `app.vue` file, wrap the nuxt page in the lenis component
   ```
      <lenis
         :options="LenisOptions"
         @initiated="foo"
         @scroll="fooBar"
      >
         <NuxtPage />
      </lenis>
   ```

## Composable

```
   const {scrollState, lenis} = useLenis()

   watch(scrollState, (val) => {
      console.log("scrollState", val);
   },{deep:true});

```
