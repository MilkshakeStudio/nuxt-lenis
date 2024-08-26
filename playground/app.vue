<template>
  <div>
    <header>
      <h1>Nuxt Lenis scroller</h1>
      <nav>
        <nuxt-link to="/">
          Index
        </nuxt-link> &nbsp;
        <nuxt-link to="/about">
          About
        </nuxt-link>
      </nav>
    </header>
    <nuxt-page />
  </div>
</template>

<script setup>

</script>

<style>
* {
   box-sizing: border-box;
}
body {
   margin: 0;
}

header {
   display: flex;
   justify-content: space-between;
   align-items: baseline;
}
</style>
