<template>
   <lenis id="test" ref="lenisRef" :options="vsOptions" @scroll="scrollEmitter">

      <h2>Index Page</h2>

      <p>Playground for lenis scroll plugin for nuxt</p>

      <div>
         <p>
            A little select to trigger the onUpdate hook in the lenis component and trigger the resize method on the lenis
            instance :
            <select
               name="selectedBaseChildOption"
               id="selectedBaseChildOption"
               v-model="selectedBaseChildOption">
               <option v-for="(_, idx) in baseChildOptions" :key="_" :value="idx">
                  {{ _.height }} - {{ _.color }}
               </option>
            </select>
         </p>
         <BaseChild v-bind="baseChildOptions[selectedBaseChildOption]"></BaseChild>
      </div>

      <div />
      <div />
      <div />

      <div class="fixed">
         <button @click="changeOptions">
            Change scrollOptions
         </button>
         <button @click="showScrollSstate = !showScrollSstate">
            {{ showScrollSstate ? 'hide' : 'show' }} scrollState
         </button>
         <div v-if="showScrollSstate">
            <pre class="nopointer">{{
               scrollState
            }}</pre>
         </div>
      </div>
   </lenis>

</template>

<script setup>
import { ref, reactive, inject, watch, onMounted } from 'vue'
import BaseChild from '../components/BaseChild'

const scrollState = inject('scrollState')
const lenisRef = ref(null)
const vsOptions = reactive({
  duration: 0.2,
  direction: 'Horizontal',
  touchMultiplier: 20,
  infinite: false,
})

const baseChildOptions = [
   {
      height: '10vh',
      color: 'rebeccapurple'
   },
   {
      height: '80vh',
      color: 'lime'
   },
   {
      height: '180vh',
      color: 'yellow'
   },
]
const selectedBaseChildOption = ref(0)
const showScrollSstate = ref(false)

watch(scrollState, (val) => {
  console.log('scrollState', val)
})

watch(vsOptions, (newVal) => {
  console.log('vsOptions newVal', newVal)
})

const scrollEmitter = (val) => {
  console.log('scrollEmitter', val)
}

const changeOptions = () => {
   console.log('🐯 changing options')
   vsOptions.duration = vsOptions.duration > 5 ? .1 : 10;
}

onMounted(() => {
  console.log('Lenis Component ref :', lenisRef.value)
})
</script>

<style>
#test>div {
   min-height: 50vh;
   margin-bottom: 300px;
   background: red;
   width: 100%;
}

.fixed {
   position: fixed;
   top: 100px;
   right: 20px;
   max-width: 50vw;
   background-color: rgba(255, 255, 255, 0.718);
   border: 1px solid #000;
   display: flex;
   flex-direction: column;
   align-items: flex-end;
}

.nopointer {
   pointer-events: none;
}
</style>
