# Nuxt Lenis Global Hooks

This module now provides global hooks using Nuxt's native hook system, allowing you to tap into Lenis lifecycle events from anywhere in your application.

## Available Hooks

### `lenis:created`
Triggered when a new Lenis instance is created.

**Payload:**
```typescript
{
  lenis: Lenis,      // The Lenis instance
  id: string,        // The instance ID
  options: LenisOptions // The options used to create the instance
}
```

### `lenis:initiated`
Triggered after a Lenis instance is fully set up and ready to use.

**Payload:**
```typescript
{
  lenis: Lenis,      // The Lenis instance
  id: string,        // The instance ID
  isDefault: boolean // Whether this is the default instance
}
```

### `lenis:scroll`
Triggered on every scroll event from any Lenis instance.

**Payload:**
```typescript
{
  lenis: Lenis,      // The Lenis instance
  id: string,        // The instance ID
  state: ScrollState // The current scroll state
}
```

### `lenis:destroy`
Triggered before a Lenis instance is destroyed.

**Payload:**
```typescript
{
  lenis: Lenis | undefined, // The Lenis instance (may be undefined)
  id: string                // The instance ID
}
```

## Usage Examples

### Basic Hook Registration

```vue
<script setup>
import { useNuxtApp } from '#app'

const nuxtApp = useNuxtApp()

// Register hooks in onMounted
onMounted(() => {
  // Listen for new Lenis instances
  nuxtApp.hook('lenis:created', (payload) => {
    console.log('New Lenis instance created:', payload.id)
  })

  // Listen for Lenis initiation
  nuxtApp.hook('lenis:initiated', (payload) => {
    console.log('Lenis instance ready:', payload.id)
    if (payload.isDefault) {
      console.log('This is the default instance!')
    }
  })

  // Listen for scroll events
  nuxtApp.hook('lenis:scroll', (payload) => {
    console.log('Scroll progress:', payload.state.progress)
  })

  // Listen for instance destruction
  nuxtApp.hook('lenis:destroy', (payload) => {
    console.log('Lenis instance destroyed:', payload.id)
  })
})
</script>
```

### Analytics Integration

```vue
<script setup>
import { useNuxtApp } from '#app'

const nuxtApp = useNuxtApp()

onMounted(() => {
  // Track scroll behavior for analytics
  nuxtApp.hook('lenis:scroll', (payload) => {
    // Only track significant scroll events
    if (payload.state.progress % 0.25 === 0) {
      // Send to analytics
      $gtag('event', 'scroll_progress', {
        page_location: window.location.href,
        progress: Math.round(payload.state.progress * 100),
        instance_id: payload.id
      })
    }
  })

  // Track when smooth scrolling is initiated
  nuxtApp.hook('lenis:initiated', (payload) => {
    $gtag('event', 'smooth_scroll_enabled', {
      instance_id: payload.id,
      is_default: payload.isDefault
    })
  })
})
</script>
```

### Custom Scroll Effects

```vue
<script setup>
import { useNuxtApp } from '#app'
import { ref } from 'vue'

const nuxtApp = useNuxtApp()
const scrollEffect = ref(0)

onMounted(() => {
  // Create custom effects based on scroll
  nuxtApp.hook('lenis:scroll', (payload) => {
    const { scroll, velocity, direction } = payload.state
    
    // Update custom effect value
    scrollEffect.value = scroll * 0.1
    
    // Change background based on scroll direction
    if (direction > 0) {
      document.body.style.background = `hsl(${scroll % 360}, 50%, 90%)`
    }
  })
})
</script>
```

### Plugin Integration

```typescript
// plugins/lenis-integration.client.ts
export default defineNuxtPlugin((nuxtApp) => {
  // Global scroll state management
  const scrollState = reactive({
    isScrolling: false,
    progress: 0,
    velocity: 0
  })

  // Update global state on scroll
  nuxtApp.hook('lenis:scroll', (payload) => {
    scrollState.isScrolling = payload.state.isScrolling
    scrollState.progress = payload.state.progress
    scrollState.velocity = payload.state.velocity
  })

  // Provide global scroll state
  return {
    provide: {
      scrollState
    }
  }
})
```

## Benefits

1. **Decoupled Architecture**: React to Lenis events without tightly coupling components
2. **Global State Management**: Easily maintain scroll-related state across your app
3. **Analytics Integration**: Track scroll behavior consistently
4. **Custom Effects**: Create scroll-based animations and effects
5. **Performance Monitoring**: Monitor scroll performance and user behavior
6. **Plugin Ecosystem**: Build plugins that extend Lenis functionality

## TypeScript Support

The hooks are fully typed. You can extend the types by creating a types file:

```typescript
// types/lenis.d.ts
declare module '@nuxt/schema' {
  interface RuntimeNuxtHooks {
    'lenis:custom': (payload: { message: string }) => void
  }
}
```
