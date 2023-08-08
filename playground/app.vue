<template>
  <lenis id="test" ref="lenisRef" :options="vsOptions" @scroll="scrollEmitter">
    <h1>hello world</h1>
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
  </lenis>
</template>

<script setup>
import { ref, inject, watch, onMounted } from 'vue'
const scrollState = inject('scrollState')
const lenisRef = ref(null)
const vsOptions = ref({
  duration: 3,
  direction: 'Horizontal',
  touchMultiplier: 20,
  infinite: false
})

watch(scrollState, async (val) => {
  console.log('scrollState', val)
})

const scrollEmitter = (val) => {
  console.log('scrollEmitter', val)
}

onMounted(() => {
  console.log('ref', lenisRef.value)
})
</script>

<style>
#test div {
   height: 50vh;
   margin-bottom: 300px;
   background: red;
   width: 100%;
}
</style>
