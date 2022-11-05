<script setup lang="ts">
import { ref } from 'vue'

const showAppBar = ref(false)
</script>

<template>
  <div @click="showAppBar = !showAppBar">
    <div class="top-0 right-0 left-0 fixed z-50">
      <div
        :class="[
          'bg-cool-gray-800',
          'h-12 py-1 px-4 sm:h-14 sm:py-2',
          'origin-top transition-transform <sm:scale-y-33',
          !showAppBar && '<sm:transform',
        ]"
      >
        <div :class="[!showAppBar && '<sm:hidden']">
          <slot name="appbar-content" />
        </div>
      </div>
      <div class="hidden relative" :class="[!showAppBar && '<sm:block']">
        <div class="absolute right-0 left-0 -top-12 px-4">
          <slot name="smallbar-content" />
        </div>
      </div>
      <hr
        class="border-sky-400 origin-top transition-transform <sm:-translate-y-8"
        :class="[!showAppBar && '<sm:transform']"
      />
    </div>
    <div class="h-4 sm:h-14" />
  </div>
</template>

<style lang="postcss" scoped></style>
