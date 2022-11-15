<script setup lang="ts">
import { useVibrate } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { CSSProperties } from 'vue'

import { useGameGridStore } from '../store/gameGrid'
import { useSettingsStore } from '../store/settings'

export interface KBButtonProps {
  k: string
  value?: string
  handler?: Function
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
  <button :style="btnStyle" @click="onClick">
    <div
      class="h-10 h-md-10 grid rounded-md"
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
