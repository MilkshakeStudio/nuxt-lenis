# Nuxt Lenis

This is a Nuxt wrapper for [Lenis](https://lenis.studiofreight.com/) by [Studio Freight](https://studiofreight.com/). Thank them for the incredible tool.


### Please Note
Because of how Vue/Nuxt `useState` works, we have to recreate the `ScrollState` to a new object. We are porting over all fields we find necessary as you can also grab `Lenis` for all methods and attributes.


## Getting Started

1. `yarn add nuxt-lenis`
2. Add `nuxt-lenis` to your modules in nuxt.config
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
   <!-- You can pass in true or false into useLenis if you want to use more than one lenis instance. Defaults to single instance (true) -->
   const {scrollState, lenis} = useLenis()

   watch(scrollState, (val) => {
      console.log("scrollState", val);
   },{deep:true});

```
### Multiple Instances
If you have multiple instances of Lenis you can get each one via an ID set ont he Lenis component
```
   <lenis id="base" >
      <NuxtPage />
   </lenis>
   
   <lenis id="modal" >
      <NuxtPage />
   </lenis>

   <!-- script -->
   const {scrollState, lenis} = useLenis(false)

   scrollState.value.base
   lenis.base
   scrollState.value.modal
   lenis.modal

```
