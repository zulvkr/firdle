<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { reactive } from 'vue';
import { AIN, FEH, LAM, SHADDA } from '../../constants/hijaiy'
import ArabicKB from '../ArabicKB.vue';

const grid = reactive([
  [{ type: 'fiil' }, {}, {}, {}, {}],
  [{ type: 'fiil' }, {}, {}, {}, {}],
  [{ type: 'fiil' }, {}, {}, {}, {}],
  [{ type: 'fiil' }, {}, {}, {}, {}],
  [{ type: 'fiil' }, {}, {}, {}, {}],
  [{ type: 'fiil' }, {}, {}, {}, {}]
])

const displayFiil = computed(() => {
  return FEH + AIN + SHADDA + LAM
})
</script>

<template>
  <div class="grid pb-[220px]">
    <div class="max-w-[380px] md:max-w-[320px] mt-4 w-full grid px-5 gap-2 justify-self-center">
      <div v-for="row in grid" class="grid gap-1 answer">
        <div v-for="col in row" class="rounded border-gray-600 border-2 grid"
          :class="[col.type !== 'fiil' && 'aspect-square']">
          <div class="place-self-center text-size-xl">
            {{ col.type ? displayFiil : FEH }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <ArabicKB />
</template>

<style lang="postcss" scoped>
.grid.answer {
  grid-template-columns: 70px repeat(4, minmax(0, 1fr));
}
</style>