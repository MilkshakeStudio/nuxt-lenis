# Nuxt Lenis

This is a Nuxt wrapper for [Lenis](https://lenis.studiofreight.com/) (by [Studio Freight](https://studiofreight.com/)) – providing smooth scrolling with support for multiple instances in a type-safe and reactive way.

> **Version 2 Notice:**  
> In version 2, the module has been refactored to centrally manage multiple Lenis instances via a Nuxt plugin. Use the provided composable (`useLenis`) for accessing instance methods and reactive scroll state. The component expects an `onScroll` prop for scroll callbacks (instead of using emits).

---

## Getting Started

1. **Install the package:**

   ```bash
   yarn add nuxt-lenis
   ```

2. **Add the module in your `nuxt.config`:**

   ```js
   export default {
      modules: [
         'nuxt-lenis'
      ]
   }
   ```

3. **Wrap your page with the Lenis component in `app.vue`:**

   ```vue
   <template>
      <lenis
         :options="LenisOptions"
         onScroll="handleScroll"
      >
         <NuxtPage />
      </lenis>
   </template>

   <script setup lang="ts">
   const handleScroll = (scrollData: any) => {
      console.log("Scroll event:", scrollData);
   }
   </script>
   ```

---

## Component Usage

The `<lenis>` component (located at `src/runtime/components/Lenis.vue`) accepts the following props:

- **id** (String, default: `"default"`): A unique identifier for your Lenis instance.
- **root** (Boolean, default: `true`): Determines if the window should be used as the scroll container.
- **options** (Object): Lenis options (e.g., `duration`, `autoRaf`, `direction`).  
- **onScroll** (Function): Callback fired whenever a scrolling event is received.

Example:

```vue
<template>
   <lenis id="default" :options="LenisOptions" onScroll="handleScroll">
      <NuxtPage />
   </lenis>
</template>

<script setup lang="ts">
const LenisOptions = {
   smooth: true,
   duration: 1.2,
   autoRaf: true,
   direction: 'vertical'
}

const handleScroll = (data: any) => {
   console.log("Scroll detected:", data);
}
</script>
```

---

## Composable Usage

Access the reactive Lenis API via the composable. By default, `useLenis()` returns the following properties:

- **createLenis**: Function to create and register a Lenis instance.
- **getLenis**: Function that returns the Lenis instance (or `null` if not found).  
- **destroyLenis**: Function to destroy an instance.  
- **scrollState**: Function to access the reactive scroll state of an instance.
- **watchScrollState**: Function to watch changes to the scroll state.

### Single Instance Usage

For many cases, a single instance is sufficient:

```vue
<script setup lang="ts">
import { watch } from 'vue';
import { useLenis } from '#imports';

const { scrollState, getLenis } = useLenis();

// Example: retrieve default instance
const instance = getLenis(); // returns the Lenis instance or null

// Watch scroll state changes
watch(scrollState, (state) => {
   console.log("Scroll state:", state);
}, { deep: true });
</script>
```

### Multiple Instances

If you need multiple instances, pass `false` (or use different IDs on each `<lenis>` component) and access them by ID:

```vue
<template>
   <lenis id="main">
      <NuxtPage />
   </lenis>
   <lenis id="modal">
      <NuxtPage />
   </lenis>
</template>

<script setup lang="ts">
import { useLenis } from '#imports';

// Using multiple instance mode:
const { scrollState, getLenis } = useLenis(false);

// Access the instances by ID
const mainInstance = getLenis("main");
const modalInstance = getLenis("modal");

// Example: Log scroll states for each instance
console.log("Main scroll state:", scrollState("main"));
console.log("Modal scroll state:", scrollState("modal"));
</script>
```

---

## Plugin API

The Nuxt plugin (located at `src/runtime/plugin.ts`) exposes the following methods:

- **createLenis(id, options?)**  
  Creates a new Lenis instance for a given ID and registers it.
  
- **getLenis(id?)**  
  Retrieves a Lenis instance by its ID (or the default instance if none is specified).
  
- **destroyLenis(id)**  
  Destroys the specified Lenis instance and cleans up its associated state.
  
- **getScrollState(id?)**  
  Returns the current scroll state for the specified instance, which is updated reactively.

The composable (`useLenis`) wraps these methods and provides a streamlined API for your components.

---

Happy scrolling!