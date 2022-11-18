<script lang="ts" setup>
import { onClickOutside, promiseTimeout } from '@vueuse/core'
import { ref, watchEffect } from 'vue'

const i_show = ref(true)

const isShaked = ref(false)

const props = defineProps<{
  modelValue: boolean
  persistent?: boolean
}>()

const emit = defineEmits(['update:modelValue'])

watchEffect(() => {
  i_show.value = props.modelValue
})

const target = ref(null)

onClickOutside(
  target,
  async () => {
    if (props.persistent && i_show.value === true) {
      isShaked.value = true
      await promiseTimeout(500)
      isShaked.value = false
      return
    }
    emit('update:modelValue', false)
  },
  { capture: false }
)

function onClickExit() {
  emit('update:modelValue', false)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="i_show" class="fixed inset-0 z-40">
        <div class="bg-opacity-70 bg-black h-full" />
      </div>
    </Transition>
    <Transition name="slide-y">
      <div
        v-if="i_show"
        class="fixed inset-0 mb-1 z-41 grid modal px-4 pt-12 py-4 overflow-y-auto items-start"
      >
        <div
          ref="target"
          class="w-full bg-gray-900 rounded-lg col-start-2 mt-12 mt-sm-0 shadow-modal"
          :class="isShaked ? 'animate-animated animate-headShake' : ''"
        >
          <slot>
            <div class="h-30" />
          </slot>
        </div>
      </div>
    </Transition>
    <button
      v-if="i_show"
      class="p-2 h-10 w-10 fixed top-2 right-5 z-42 grid place-content-center"
      :class="isShaked ? 'animate-animated animate-headShake' : ''"
      @click="onClickExit"
    >
      <i-ic-baseline-close font-size="24px" />
    </button>
  </Teleport>
</template>

<style lang="postcss" scoped>
.grid.modal {
  grid-template-columns: auto minmax(0, 560px) auto;
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
.shadow-modal {
  box-shadow: inset 1px 1px 0 0 rgb(23, 33, 53), 0 3px 8px 0 rgb(7, 10, 15);
}
</style>
