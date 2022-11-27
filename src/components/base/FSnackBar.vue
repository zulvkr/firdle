<script lang="ts" setup>
import { onClickOutside, useDebounceFn } from '@vueuse/core'
import { ref } from 'vue'

import { snackbarBus, snackbarOptions } from '../../store'

const show = ref(false)
const options = ref<Partial<snackbarOptions>>({})

// const color = computed(() => {
//   let className = ''
//   if (options.value.status === 'error') {
//     className = 'bg-dark-600'
//   }
//   if (options.value.status === 'info') {
//     className = 'bg-sky-600'
//   }
//   if (options.value.status === 'success') {
//     className = 'bg-green-600'
//   }
//   if (options.value.status === 'warning') {
//     className = 'bg-yellow-600'
//   }
//   return className
// })

const debouncedHideSnackBar = useDebounceFn(() => {
  show.value = false
}, 1300)

snackbarBus.on((event) => {
  if (!event) {
    return
  }
  options.value = event
  show.value = true
  debouncedHideSnackBar()
})

const target = ref(null)

onClickOutside(target, () => (show.value = false))
</script>

<template>
  <Teleport to="body">
    <Transition name="slide-y">
      <div
        v-if="show"
        ref="target"
        :class="[
          'border rounded-lg',
          'font-semibold font-IBM text-dark-100 text-center',
          'bg-white shadow-lg mx-4 backdrop-blur-md backdrop-filter',
          'inset-x-0 top-20 fixed w-max mx-auto',
        ]"
      >
        <div class="py-2 px-4">
          <!-- <div class="pb-4">
            <div class="rounded-md w-4 aspect-square" :class="color" />
          </div> -->
          <div>
            {{ options.message }}
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
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
