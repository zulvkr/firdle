<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'
import { Ref, ref, watch, watchEffect } from 'vue'

const i_show = ref(true)

const props = defineProps<{
  modelValue: boolean
  persistent: boolean
}>()

const emit = defineEmits(['update:modelValue'])

watchEffect(() => {
  i_show.value = props.modelValue
})

const target = ref(null)

onClickOutside(target, () => {
  if (props.persistent) {

    return
  }
  emit('update:modelValue', false)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="i_show" class="fixed inset-0 z-40">
        <div class="opacity-70 bg-black h-full"></div>
      </div>
    </Transition>
    <Transition name="slide-y">
      <div v-if="i_show" class="fixed inset-0 z-41 grid modal px-4 pt-12 py-4 overflow-scroll">
        <div
          ref="target"
          class="w-full bg-gray-900 border-gray-500 border rounded-lg place-self-center col-start-2"
        >
          <slot>
            <div class="h-30"></div>
          </slot>
        </div>
      </div>
    </Transition>
    <div v-if="i_show" class="p-2 h-10 w-10 fixed top-2 right-0 z-42" @click="$emit('update:modelValue')">
      <i-ic-baseline-close font-size="20px" />
    </div>
  </Teleport>
</template>

<style lang="postcss" scoped>
.grid.modal {
  grid-template-columns: auto minmax(0, 420px) auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-y-enter-active,
.slide-y-leave-active {
  transition: all 0.3s ease;
}

.slide-y-enter-from,
.slide-y-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}
</style>
