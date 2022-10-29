<script setup lang="ts">
import { CSSProperties, PropType } from 'vue'
import { useGameStore } from '../store/game'

const props = defineProps({
  k: String,
  value: String,
  charStyle: Object as PropType<CSSProperties>,
  btnStyle: Object as PropType<CSSProperties>,
  btnWrapperStyle: Object as PropType<CSSProperties>,
  icon: String,
})

const { fill } = useGameStore()
const onClick = () => {
  if (props.value) {
    fill(props.value)
  } else if (props.k) {
    fill(props.k)
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
        <span v-if="props.icon" v-html="props.icon" class="text-[18px]" />
        <template v-else>
          {{ props.k }}
        </template>
      </div>
    </div>
  </button>
</template>
