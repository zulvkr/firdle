<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { reactive, ref } from 'vue'
import { AIN, FEH, LAM, SHADDA } from '../../constants/hijaiy'
import ArabicKB from '../ArabicKB.vue'

const grid = reactive([
  [{ type: 'fiil' }, {}, {}, {}, {}],
  [{ type: 'fiil' }, {}, {}, {}, {}],
  [{ type: 'fiil' }, {}, {}, {}, {}],
  [{ type: 'fiil' }, {}, {}, {}, {}],
  [{ type: 'fiil' }, {}, {}, {}, {}],
  [{ type: 'fiil' }, {}, {}, {}, {}],
])

const activeRow = ref(0)

const displayFiil = computed(() => {
  return FEH + AIN + SHADDA + LAM
})
</script>

<template>
  <div class="grid index-page">
    <div
      class="max-w-[380px] md:max-w-[380px] mt-4 w-full grid px-5 gap-2 justify-self-center"
    >
      <div v-for="row, index in grid" class="grid gap-1 answer">
        <div
          v-for="col in row"
          class="rounded border-2 grid"
          :class="[
            col.type !== 'fiil' && 'aspect-square',
            activeRow === index ? 'border-gray-600' : 'border-gray-700',
          ]"
        >
          <div class="place-self-center text-size-xl"></div>
        </div>
      </div>
    </div>
  </div>
  <ArabicKB />
</template>

<style lang="postcss" scoped>
.grid.index-page {
  /* Padding necessary to prevent some parts of grid hidden by keyboard */
  padding-bottom: 230px;
}
.grid.answer {
  grid-template-columns: 70px repeat(4, minmax(0, 1fr));
}
</style>
