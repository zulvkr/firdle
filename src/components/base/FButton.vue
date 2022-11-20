<script lang="ts" setup>
import { computedEager } from '@vueuse/shared'
import { RouteLocation } from 'vue-router'

const props = defineProps<{
  is?: 'button' | 'a' | 'input' | 'RouterLink'
  href?: string | URL
  to?: string | RouteLocation
}>()

function r_is() {
  if (props.is) {
    return props.is
  }
  if (props.href) {
    return 'a'
  }
  if (props.to) {
    return 'RouterLink'
  }
  return 'button'
}

const _is = computedEager(r_is)
</script>

<template>
  <component :is="_is" class="f-button font-IBM cursor-pointer select-none">
    <slot />
  </component>
</template>

<style>
.f-button {
  --f-btn-px: 0.75rem;
  --f-btn-py: 0.375rem;
  --f-btn-font-size: 1rem;
  --f-btn-font-weight: 400;
  --f-btn-line-height: 1.5;
  --f-btn-bg: transparent;
  --f-btn-border-width: 1px;
  --f-btn-border-color: transparent;
  --f-btn-border-radius: 0.375rem;
  --f-btn-disabled-opacity: 0.65;
  display: inline-block;
  padding: var(--f-btn-py) var(--f-btn-px);
  font-size: var(--f-btn-font-size);
  font-weight: var(--f-btn-font-weight);
  line-height: var(--f-btn-line-height);
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  border-radius: var(--f-btn-border-radius);
}
.f-button:disabled {
  pointer-events: none;
  opacity: var(--f-btn-disabled-opacity);
}
</style>
