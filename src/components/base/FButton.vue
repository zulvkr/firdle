<script lang="ts" setup>
import { computedEager } from '@vueuse/shared'
import { ref } from 'vue'
import { RouteLocation } from 'vue-router'

const emit = defineEmits(['click'])

const props = defineProps<{
  is?: 'button' | 'a' | 'input' | 'RouterLink'
  href?: string | URL
  to?: string | RouteLocation
  disabled?: boolean
  clickClass?: string | (() => void)
}>()

function r_is() {
  if (props.is) {
    return props.is
  }
  if (props.href) {
    if (props.disabled) {
      return 'button'
    }
    return 'a'
  }
  if (props.to) {
    return 'RouterLink'
  }
  return 'button'
}

function r_href() {
  if (props.disabled) {
    return undefined
  }
  return props.href
}

function r_to() {
  if (props.disabled) {
    return undefined
  }
  return props.to
}

function r_clickClass() {
  if (props.disabled) {
    return
  }
  emit('click')
  if (!props.clickClass) {
    return
  }
  if (typeof props.clickClass === 'string') {
    _clickClass.value = props.clickClass
    setTimeout(() => {
      _clickClass.value = undefined
    }, 200)
  }
}

const _is = computedEager(r_is)
const _to = computedEager(r_to)
const _href = computedEager(r_href)
const _clickClass = ref<string | undefined>(undefined)
</script>

<template>
  <component
    :is="_is"
    :href="_href"
    :disabled="disabled"
    :to="_to"
    class="f-button font-IBM cursor-pointer select-none transition-all text-sm"
    :class="_clickClass"
    @click="r_clickClass"
  >
    <slot />
  </component>
</template>

<style lang="postcss">
.f-button {
  --f-btn-px: 0.75rem;
  --f-btn-py: 0.375rem;
  --f-btn-font-weight: 500;
  --f-btn-font-size: 1rem;
  --f-btn-line-height: 1.5rem;
  --f-btn-bg: transparent;
  --f-btn-border-width: 1px;
  --f-btn-border-color: transparent;
  --f-btn-border-radius: 0.375rem;
  --f-btn-disabled-opacity: 0.65;
  display: inline-flex;
  align-items: center;
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
.f-button {
  &.f-var-small {
    --f-btn-font-size: 0.875rem;
    --f-btn-line-height: 1.25rem;
  }
}
</style>
