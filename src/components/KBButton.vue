<script setup lang="ts">
import { CSSProperties } from 'vue'

import { useGameStore } from '../store/game'

export interface Button {
  k: string
  value?: string
  handler?: Function
  icon?: string
  charStyle?: CSSProperties
  btnStyle?: CSSProperties
  btnWrapperStyle?: CSSProperties
}

const props = defineProps<Button>()

const { fill } = useGameStore()

const onClick = () => {
  if (props.handler) {
    return props.handler(props.value)
  }
  if (props.value) {
    return fill(props.value)
  }
  if (props.k) {
    return fill(props.k)
  }
}
</script>

<template>
  <button :style="btnStyle" @click="onClick">
    <div class="bg-cool-gray-600 h-10 h-md-10 grid rounded-md" :style="btnWrapperStyle">
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
