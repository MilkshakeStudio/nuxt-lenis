<template>
   <div ref="lenisWrapper">
      <div v-if="options?.wrapper" id="lenis-content" ref="lenisContent">
         <slot />
      </div>
      <slot v-else />
   </div>
</template>

<script setup>
import {
   ref,
   watch,
   onMounted,
   onBeforeUnmount,
   onUpdated,
   inject,
   toRef,
   computed,
} from "vue";
import { useLenis } from "#imports";
const Lenis = inject("Lenis");
const { setScrollState, setLenis } = useLenis();

var lenisVS = null;
var lenisRaf = null;
const lenisWrapper = ref(null);
const lenisContent = ref(null);
const emit = defineEmits(["scroll", "initiated"]);

// >> PROPS
const props = defineProps({
   options: {
      type: Object,
      default: () => {},
   },
});
const extraOptions = ref({});
const options = toRef(props, "options");
/**
 * Starting options - for full list of options visit https://github.com/studio-freight/lenis
 */
const lenisOptions = computed(() => {
   return Object.assign(
      {},
      {
         duration: 1.2,
         easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
         direction: "vertical",
         gestureDirection: "vertical",
      },
      props.options,
      extraOptions.value
   );
});

const instanceId = computed(() => lenisWrapper.value.id ?? "LenisBase");

// >> WATCHERS
watch(lenisOptions, (newVal) => {
   if (!lenisVS) return;
   destroyLenis();
   initLenis();
});

// >> METHODS
const initLenis = () => {
   if (process.client) {
      lenisVS = new Lenis(lenisOptions.value);
      
      setLenis(lenisVS, instanceId.value);
      setScrollState(lenisVS, instanceId.value);


      lenisVS.on("scroll", (scrollData) => {
         setScrollState(scrollData, instanceId.value);
         emit("scroll", scrollData);
      });

     
      emit("initiated", { lenis: lenisVS });
      lenisRaf = requestAnimationFrame(raf);
   } else {
      throw new Error("Process Client is false");
   }
};

const raf = (time) => {
   if (!lenisVS) return;
   lenisVS.raf(time);
   requestAnimationFrame(raf);
};

const destroyLenis = () => {
   if (!lenisVS) return;
   setScrollState(false, instanceId.value);
   setLenis(false, instanceId.value);
   lenisVS.off("scroll");
   lenisVS.destroy();
   cancelAnimationFrame(lenisRaf);
};

// >> LIFECYCLE
onMounted(() => {
   if (options?.value?.wrapper) {
      extraOptions.value.wrapper = lenisWrapper.value;
      extraOptions.value.content = lenisWrapper.value.children[0];
   }
   initLenis();
});

// Destroy on unmount
onBeforeUnmount(() => {
   destroyLenis();
});

onUpdated(() => {
   // if (!lenisVS.value) return;
   // if (!props.options?.autoResize) lenisVS.value.resize();
});

defineExpose({
   destroyLenis,
   initLenis,
   lenisWrapper,
   lenisVS,
});
</script>

<style>
html.lenis,
html.lenis body {
   height: auto;
}

.lenis.lenis-smooth {
   scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
   overscroll-behavior: contain;
}

.lenis.lenis-stopped {
   overflow: hidden;
}

.lenis.lenis-smooth iframe {
   pointer-events: none;
}
</style>
