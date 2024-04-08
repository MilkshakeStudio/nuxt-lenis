<template>
  <lenis
    id="wrapper"
    ref="lenisRef"
    :options="vsOptions"
    @scroll="scrollEmitter"
    @initiated="initiated"
  >
    <!-- <div id="content"> -->
    <div>
      <h2 @click="stop">
        STOP
      </h2>
      <h2 @click="start">
        START
      </h2>
      <h2 @click="changeOptions">
        CHANGE
      </h2>
      <p>Playground for lenis scroll plugin for nuxt</p>
    </div>

    <div />
    <div />
    <div />
    <!-- </div> -->
  </lenis>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue'
import { useLenis } from '../../dist/runtime/composables/useLenis'
const { scrollState } = useLenis()
const lenisRef = ref(null)
const lenisVs = ref(false)
const vsOptions = reactive({
  // wrapper: "#wrapper",
  touchMultiplier: 20,
  infinite: false
})

watch(scrollState, (val) => {
  console.log('scrollState', val)
})

watch(vsOptions, (newVal) => {
  console.log('vsOptions newVal', newVal)
})

const scrollEmitter = (val) => {
  // console.log("scrollEmitter", val);
}
const stop = (val) => {
  console.log('lenisVs', lenisVs.value)
  lenisVs.value.stop()
}
const start = (val) => {
  console.log('lenisVs', lenisVs.value)
  lenisVs.value.start()
}

const initiated = ({ lenis }) => (lenisVs.value = lenis)
const changeOptions = () => {
  console.log('🐯 changing options')
  vsOptions.duration = vsOptions.duration > 5 ? 0.1 : 10
}

onMounted(() => {
  console.log('Lenis Component ref :', lenisRef.value)
})
</script>

<style>
/* #test {
   height: auto;
} */
#wrapper div {
   min-height: 50vh;
   margin-bottom: 300px;
   background: beige;
   width: 100%;
}

#wrapper {
   max-height: 100vh;
   /* height: auto; */
   /* pointer-events: none; */
}
#content {
   height: auto;
}
.fixed {
   position: fixed;
   top: 100px;
   right: 20px;
   max-width: 50vw;
   background: white;
   border: 1px solid #000;
   display: flex;
   flex-direction: column;
   align-items: flex-end;
}

.nopointer {
   pointer-events: none;
}
</style>
