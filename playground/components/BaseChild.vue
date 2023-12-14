<script setup>
const props = defineProps({
   height: {
      type: String,
      default: '10vh',
   },
   color: {
      type: String,
      default: 'rebeccaPurple'
   }
})
</script>

<template>
   <div>
      <p>I'm the BaseChild component. My color and height can change based on my props</p>
   </div>
</template>

<style scoped>
div {
   padding: 10px;
   width: 50vw;
   height: v-bind(props.height);
   background-color: v-bind(props.color);
}
</style>
