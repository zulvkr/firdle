<script setup lang="ts">
import { useVibrate } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { CSSProperties } from 'vue'

import { useGameGridStore } from '../store/gameGrid'
import { useSettingsStore } from '../store/settings'

export interface KBButtonProps {
  k: string
  value?: string
  handler?: (...args: unknown[]) => void
  icon?: string
  charStyle?: CSSProperties
  btnStyle?: CSSProperties
  btnWrapperStyle?: CSSProperties
  dim?: boolean
}

const { vibrate } = useVibrate({ pattern: [16] })

const props = defineProps<KBButtonProps>()

const { fill } = useGameGridStore()

const settingsStore = useSettingsStore()
const { vibrateKeyboard } = storeToRefs(settingsStore)

const onClick = () => {
  if (vibrateKeyboard.value) {
    vibrate()
  }
  if (props.handler) {
    return props.handler(props.value)
  }
  if (props.value) {
    return fill(props.value)
  }
  return fill(props.k)
}
</script>

<template>
  <button :style="btnStyle" class="select-none" @click="onClick">
    <div
      class="h-10 h-md-10 grid rounded-md ol-shadow hover:bg-gray-500"
      :class="[dim ? 'bg-dark-400' : 'bg-gray-600']"
      :style="btnWrapperStyle"
    >
      <div
        class="place-self-center text-size-[20px] sm:text-size-[22px] w-4 text-center"
        :style="charStyle"
      >
        <span v-if="props.icon" v-html="props.icon" />
        <template v-else>
          {{ props.k }}
        </template>
      </div>
    </div>
  </button>
</template>

<style scoped>
.ol-shadow {
  --ol-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: var(--ol-shadow);
  box-shadow: var(--ol-shadow);
}
</style>
