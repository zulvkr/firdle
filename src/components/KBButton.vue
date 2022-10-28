<script setup lang="ts">
import { CSSProperties, VueElement } from 'vue';



const props = defineProps({
  k: String,
  // Value to emit during X
  value: String,
  charStyle: Object as () => CSSProperties,
  btnStyle: Object as () => CSSProperties,
  btnWrapperStyle: Object as () => CSSProperties,
  icon: Object
})

</script>

<template>
  <div :style="btnStyle">
    <div class="bg-cool-gray-600 h-10 grid rounded-[5px]" :style="btnWrapperStyle">
      <div class="place-self-center text-size-[20px] w-4 text-center" :style="charStyle">
        <span v-if="props.icon" v-html="props.icon" class="text-[18px]" />
        <template v-else>
          {{ props.k }}
        </template>
      </div>
    </div>
  </div>
</template>