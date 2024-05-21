<template>
   <div ref="lenisWrapper">
      <div v-if="options.wrapper" ref="lenisContent"><slot /></div>
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
   computed,
} from "vue";
import { useLenis } from "#imports";
const Lenis = inject("Lenis");
const { setScrollState, setLenis } = useLenis();

const lenisVS = ref(0);
const lenisRaf = ref(null);
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

/**
 * Starting options - for full list of options visit https://github.com/studio-freight/lenis
 */
const lenisOptions = computed(() => {
   return {
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      ...props.options,
   };
});
const instanceId = computed(() => lenisWrapper.value.id ?? "LenisBase");

// >> WATCHERS
watch(lenisOptions, (newVal) => {
   if (!lenisVS.value) return;
   destroyLenis();
   initLenis();
});
// >> METHODS
const initLenis = () => {
   if (process.client) {
      lenisVS.value = new Lenis(lenisOptions.value);
      lenisVS.value.on("scroll", (scrollData) => {
         setScrollState(scrollData, instanceId.value);
         emit("scroll", scrollData);
      });
      setLenis(lenisVS.value, instanceId.value);
      setScrollState(lenisVS.value, instanceId.value);
      emit("initiated", { lenis: lenisVS.value });
      lenisRaf.value = requestAnimationFrame(raf);
   } else {
      throw new Error("Process Client is false");
   }
};

const raf = (time) => {
   if (!lenisVS.value) return;
   lenisVS.value.raf(time);
   requestAnimationFrame(raf);
};

const destroyLenis = () => {
   if (!lenisVS.value) return;
   setScrollState(false, instanceId.value);
   setLenis(false, instanceId.value);
   lenisVS.value.off("scroll");
   lenisVS.value.destroy();
   cancelAnimationFrame(lenisRaf.value);
};

// >> LIFECYCLE
onMounted(() => {
   if (props.options.wrapper) {
      props.options.wrapper = lenisWrapper.value;
      props.options.content = lenisWrapper.value.children[0];
   }
   initLenis();
});

// Destroy on unmount
onBeforeUnmount(() => {
   destroyLenis();
});

onUpdated(() => {
   if (!lenisVS.value) return;
   if (!props.options.autoResize) lenisVS.value.resize();
});

defineExpose({
   destroyLenis,
   initLenis,
   lenisWrapper,
   lenisVS,
});
</script>

<style>
html.lenis {
   height: auto;
}

.lenis.lenis-smooth {
   scroll-behavior: auto !important;
   overflow: hidden;
}

.lenis.lenis-smooth [data-lenis-prevent] {
   overscroll-behavior: contain;
}

.lenis.lenis-stopped {
   overflow: hidden;
}

.lenis.lenis-scrolling iframe {
   pointer-events: none;
}

</style>
