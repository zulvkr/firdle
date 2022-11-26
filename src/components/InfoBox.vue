<!-- eslint-disable vue/no-v-html -->
<script lang="ts" setup>
import { useClipboard } from '@vueuse/core'
import { computed } from 'vue'

import { getJSON } from '../queries/type'

const props = defineProps<{
  data: getJSON<'/fiil/'>['data']
}>()

const matchedResult = computed(() => props.data?.matchedResult)

const { copy, copied, isSupported } = useClipboard({
  source: matchedResult.value,
})

const details = computed(() => props.data?.resultDetails?.join?.(''))
</script>

<template>
  <div class="font-IBM text-xl leading-10 text-white" dir="rtl">
    <div class="flex pt-4 px-4 justify-between">
      <div class="flex items-center pt-2">
        <span class="font-medium text-3xl">{{ data?.matchedResult }}</span>
        <span class="pr-2">
          <FButton
            :href="`https://almaany.com/ar/dict/ar-ar/${data?.matchedResult}/`"
            class="f-var-small bg-sky-400 bg-opacity-0 hover:bg-opacity-10 text-sky-400 ring-sky-400 focus-visible:ring"
            click-class="!bg-opacity-20"
            target="_blank"
          >
            <i-ic-baseline-open-in-new class="ml-1.5" />
            Almaany
          </FButton>
          <FButton
            v-if="isSupported"
            class="f-var-small bg-light-700 bg-opacity-0 hover:bg-opacity-10 text-light-700 ring-light-700 focus-visible:ring"
            click-class="!bg-opacity-20"
            @click="copy()"
          >
            <i-ic-baseline-content-copy class="ml-1.5" />
            <span v-if="!copied">Salin</span>
            <span v-else>Tersalin</span>
          </FButton>
        </span>
      </div>
      <div>
        <div
          class="text-base border border-gray-500 px-2 py-2 rounded font-IBM font-medium items-center flex"
        >
          فعل
        </div>
      </div>
    </div>
    <div class="pb-4 px-4 pt-2">
      <ol
        class="almaany-details list-square pr-5 marker:text-sm marker:text-sky-400"
        v-html="details"
      />
    </div>
  </div>
</template>

<style lang="postcss">
.almaany-details {
  font-weight: 400;
  b {
    font-weight: 500;
    @apply text-yellow-300;
  }
  li {
    margin-top: 4px;
  }
}
</style>
