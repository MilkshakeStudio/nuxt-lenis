<template>
  <lenis id="wrapper" ref="lenisRef" @click="handleClick">
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
    <div />
    <div />
    <div />
    <!-- </div> -->
  </lenis>
</template>

<script setup>
import { ref, reactive, watch, onMounted, computed } from 'vue'
import { useLenis } from '#imports'
// import { useLenis } from "#app";

// const scrollEmitter = (val) => {
//    console.log("scrollEmitter", val);
// };
const { scrollState, getLenis } = useLenis()
const lenisRef = ref(null)
const vsOptions = reactive({})

watch(
  scrollState,
  (scroll) => {
    console.log('WATCHER- SCROLL', scroll)
    // console.log("WATCHER", val);
  },
  { deep: true }
)

const stop = (val) => {
  getLenis().stop()
}
const start = (val) => {
  getLenis().start()
}

const handleClick = () => {
  console.log('handleClick------', lenisRef.value)
}

const changeOptions = () => {
  // console.log("🐯 changing options");
  vsOptions.duration = vsOptions.duration > 5 ? 0.1 : 10
}

onMounted(() => {
  console.log('handleClick------')
})
</script>

<style>
/* #test {
   height: auto;
} */
#wrapper div,
#base div {
   min-height: 50vh;
   margin-bottom: 300px;
   background: beige;
   width: 100%;
   &:nth-child(odd) {
      background-color: pink;
   }
}

#wrapper,
#base {
   /* max-height: 50vh; */
   /* overflow: hidden; */
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

</style>
