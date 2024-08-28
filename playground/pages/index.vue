<template>
   <lenis
      id="wrapper"
      ref="lenisRef"
      @scroll="scrollEmitter"
      @initiated="initiated"
      @click="handleClick"
   >
      <!-- <div id="content"> -->
      <div>
         <h2 @click="stop">STOP</h2>
         <h2 @click="start">START</h2>
         <h2 @click="changeOptions">CHANGE</h2>
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
import { ref, reactive, watch, onMounted, computed } from "vue";
import { useLenis } from "#imports";
// import { useLenis } from "#app";
const { scrollState, lenis: lenisN, lenisInstance } = useLenis();
const lenisRef = ref(null);
var lenisLocalVS = null;
const vsOptions = reactive({});

watch(
   ()=>scrollState,
   ({ scroll, ...props }) => {
      console.log("WATCHER", props);
   },
   { deep: true }
);

watch(vsOptions, (newVal) => {
   // console.log("vsOptions newVal", newVal);
});

const scrollEmitter = (val) => {
   // console.log("scrollEmitter", val);
};
const stop = (val) => {
   // lenisN.wrapper.stop();
   lenisN.value.stop();
   // lenisLocalVS.stop();
};
const start = (val) => {
   // console.log("lenisVs", lenisVs.value);
   // lenisN.wrapper.start();
   lenisN.value.start();
   console.log(lenisN);
   
   // lenisLocalVS.start();
};

const handleClick = () => {
   console.log("scrollState------", lenisN);
};

const initiated = ({ lenis }) => (lenisLocalVS = lenis);
const changeOptions = () => {
   // console.log("🐯 changing options");
   vsOptions.duration = vsOptions.duration > 5 ? 0.1 : 10;
};

onMounted(() => {
   // console.log("Lenis Component ref :", lenisRef.value);
   // console.log("lenisTest------", lenisInstance("wrapper").isStopped);
   console.log("lenisN------", lenisN.value);
   console.log("scrollState------", scrollState.value);
});
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

.nopointer {
   pointer-events: none;
}
</style>
