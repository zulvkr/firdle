<script lang="ts" setup>
import { onClickOutside, promiseTimeout, useScrollLock } from '@vueuse/core'
import { ref, watchEffect } from 'vue'

const i_show = ref(true)

const isShaked = ref(false)

const props = defineProps<{
  modelValue: boolean
  persistent: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const body = document.body
const bodyLock = useScrollLock(body)

watchEffect(() => {
  i_show.value = props.modelValue
  bodyLock.value = i_show.value
  body.style.paddingRight = i_show.value ? 'calc(100vw - 100%)' : ''
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
        <div class="opacity-70 bg-black h-full"></div>
      </div>
    </Transition>
    <Transition name="slide-y">
      <div
        v-if="i_show"
        class="fixed inset-0 mb-1 z-41 grid modal px-4 pt-12 py-4 overflow-y-auto"
      >
        <div
          ref="target"
          class="w-full bg-gray-900 border-gray-500 border rounded-lg place-self-center col-start-2 shadow-lg"
          :class="isShaked ? 'animate-animated animate-headShake' : ''"
        >
          <slot>
            <div class="h-30"></div>
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
