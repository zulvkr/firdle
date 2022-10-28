<script setup lang="ts">
import AppBar from './components/AppBar.vue'
</script>

<template>
  <header>
    <AppBar />
  </header>
  <main class="font-readex">
    <router-view />
  </main>
</template>

<style lang="postcss">
@import url('./assets/fonts/fonts.css');
</style>
