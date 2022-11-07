<script lang="ts" setup></script>

<template>
  <div
    class="rounded-full h-5 w-5 text-sm text-center leading-5 grid place-items-center"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>