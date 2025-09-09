<template>
  <div>
    <h1>Lenis Global Hooks Example</h1>
    <p>Check the console to see the hooks being triggered!</p>
    <p>Scroll position: {{ scrollPosition }}</p>
    <p>Lenis instances: {{ Object.keys(lenisInstances) }}</p>
    
    <button @click="createNewInstance">Create New Lenis Instance</button>
    <button @click="destroyInstance" v-if="Object.keys(lenisInstances).length > 1">
      Destroy Instance
    </button>
    
    <div style="height: 200vh; background: linear-gradient(to bottom, #ff7b7b, #61dafb);">
      <h2>Scroll to see hooks in action!</h2>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useNuxtApp } from '#app'
import { useLenis } from '#imports'

const nuxtApp = useNuxtApp()
const { createLenis, destroyLenis } = useLenis()

const scrollPosition = ref(0)
const lenisInstances = reactive({})

let instanceCounter = 0

// Register global hooks
onMounted(() => {
  // Hook into lenis creation
  nuxtApp.hook('lenis:created', (payload) => {
    console.log('🎯 Lenis Created Hook:', payload)
    lenisInstances[payload.id] = {
      created: new Date(),
      options: payload.options
    }
  })

  // Hook into lenis initiation
  nuxtApp.hook('lenis:initiated', (payload) => {
    console.log('🚀 Lenis Initiated Hook:', payload)
    if (lenisInstances[payload.id]) {
      lenisInstances[payload.id].initiated = new Date()
      lenisInstances[payload.id].isDefault = payload.isDefault
    }
  })

  // Hook into scroll events
  nuxtApp.hook('lenis:scroll', (payload) => {
    scrollPosition.value = Math.round(payload.state.scroll)
    // Only log occasionally to avoid console spam
    if (Math.round(payload.state.scroll) % 100 === 0) {
      console.log('📜 Lenis Scroll Hook:', {
        id: payload.id,
        scroll: payload.state.scroll,
        progress: payload.state.progress
      })
    }
  })

  // Hook into lenis destruction
  nuxtApp.hook('lenis:destroy', (payload) => {
    console.log('💥 Lenis Destroy Hook:', payload)
    delete lenisInstances[payload.id]
  })

  console.log('✅ All Lenis hooks registered!')
})

const createNewInstance = () => {
  instanceCounter++
  const newId = `custom-${instanceCounter}`
  createLenis(newId, {
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  })
}

const destroyInstance = () => {
  const instances = Object.keys(lenisInstances)
  if (instances.length > 1) {
    // Don't destroy the default instance
    const toDestroy = instances.find(id => !lenisInstances[id].isDefault)
    if (toDestroy) {
      destroyLenis(toDestroy)
    }
  }
}
</script>

<style scoped>
button {
  margin: 10px;
  padding: 10px 20px;
  background: #61dafb;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #21a0c4;
}
</style>
