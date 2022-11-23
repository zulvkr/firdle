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
    <FOverlay :show="i_show" />
    <Transition name="modal-slide-y">
      <div
        v-if="i_show"
        class="f-modal grid sm:items-start z-41 fixed overflow-y-auto inset-0 pt-4 sm:py-4 sm:px-4 pt-12 mb-1"
      >
        <div
          ref="target"
          class="modal rounded-lg bg-gray-900 mt-0 sm:mt-12 w-full col-start-2"
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
      class="h-10 grid p-2 top-2 right-5 w-10 z-42 fixed place-content-center"
      :class="isShaked ? 'animate-animated animate-headShake' : ''"
      @click="onClickExit"
    >
      <i-ic-baseline-close font-size="24px" />
    </button>
  </Teleport>
</template>

<style lang="postcss">
.f-modal {
  &.grid {
    grid-template-columns: auto minmax(0, 560px) auto;
  }
  .modal {
    box-shadow: inset 1px 1px 0 0 rgb(23, 33, 53), 0 3px 8px 0 rgb(7, 10, 15);
  }
}

.modal-slide-y-enter-active,
.modal-slide-y-leave-active {
  transition: all 0.3s ease;
}

.modal-slide-y-enter-from,
.modal-slide-y-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}
</style>
