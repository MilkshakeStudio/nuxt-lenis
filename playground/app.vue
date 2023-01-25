<template>
   <lenis :options="vsOptions" id="test" @scroll="test">
         {{ vsOptions }}
         <h1>hello world</h1>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
      </lenis>
</template>

<script setup>
import { ref } from "vue";
const test = (ev)=>{
   console.log('ev',ev)
}
const vsOptions = ref(false);
vsOptions.value = {
   duration: 3,
   direction: "Horizontal",
   touchMultiplier: 20,
   infinite: false,
};
</script>

<style >
#test div {
   height: 50vh;
   margin-bottom: 300px;
   background: red;
   width: 100%;
}
</style>
