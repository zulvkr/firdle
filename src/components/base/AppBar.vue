<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { onMounted, ref } from 'vue'

const isAppBarExpanded = ref(false)

onMounted(() => {
  const breakpoints = useBreakpoints(breakpointsTailwind)
  if (breakpoints.isGreaterOrEqual('sm')) {
    isAppBarExpanded.value = true
  }
})
</script>

<template>
  <div class="top-0 sticky z-30 h-[var(--app-bar-height-fill-space)]">
    <Transition name="fade" mode="out-in">
      <AppBarRegular v-if="isAppBarExpanded" @click-outside="isAppBarExpanded = false">
        <slot name="appbar-content" />
      </AppBarRegular>
      <AppBarMini v-else @click="isAppBarExpanded = true">
        <slot name="smallbar-content" />
      </AppBarMini>
    </Transition>
    <div class="absolute top-0 left-0 right-0">
      <hr
        class="border-gray-500 origin-top transition-transform transform"
        :class="
          isAppBarExpanded
            ? 'translate-y-[var(--app-bar-height)]'
            : 'translate-y-[var(--mini-app-bar-height)]'
        "
      />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<style lang="postcss">
:root {
  --mini-app-bar-height: 16px;
  --app-bar-height: 48px;
  --app-bar-height-fill-space: var(--mini-app-bar-height);
  @screen sm {
    --app-bar-height: 56px;
    --app-bar-height-fill-space: var(--app-bar-height);
  }
}
</style>
