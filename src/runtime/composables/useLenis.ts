import { useState } from '#app'
import { computed } from '#imports'

export function useLenis (single: Boolean = true): Object {
  const scrollState = useState('scrollState', () => [])
  const lenisVS = useState('lenisVS', () => [])
  const ids = useState('ids', () => [])

  const setScrollState = (newScrollState: Object, id: String | Number) => {
    scrollState.value[id] = newScrollState
  }
  const setLenis = (virtualScroll: Object, id: String | Number) => {
    lenisVS.value[id] = virtualScroll
    ids.value.push(id)
  }

  const getScrollState = computed(() => {
    return single ? scrollState.value[ids.value[0]] : scrollState
  })

  const getLenis = computed(() => {
    return single ? lenisVS.value[ids.value[0]] : lenisVS
  })

  return {
    scrollState: getScrollState,
    lenis: getLenis,
    setScrollState,
    setLenis
  }
}
