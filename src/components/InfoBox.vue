<!-- eslint-disable vue/no-v-html -->
<script lang="ts" setup>
import { computed } from 'vue'

import { getJSON } from '../queries/type'

const props = defineProps<{
  data: getJSON<'/fiil/'>['data']
}>()

const details = computed(() => props.data?.resultDetails?.join?.(''))
</script>

<template>
  <div class="font-IBM text-lg leading-10 text-white" dir="rtl">
    <div class="flex pt-4 px-4 justify-between">
      <div class="flex items-center">
        <span class="font-medium text-2xl">{{ data?.matchedResult }}</span>
        <span class="pr-2 text-sm">
          <a
            :href="`https://almaany.com/ar/dict/ar-ar/${data?.matchedResult}/`"
            class="hover:bg-sky-400 hover:bg-opacity-5 pt-2 pb-1 px-2 rounded text-sky-400"
            target="_blank"
          >
            <span class="inline-flex">
              <i-ic-baseline-open-in-new />
              <div class="pr-1">almaany</div>
            </span>
          </a>
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
    <div class="pb-4 px-4">
      <ol
        class="almaany-details list-disc pr-4 marker:text-sm marker:text-gray-400"
        v-html="details"
      />
    </div>
  </div>
</template>

<style lang="postcss">
.almaany-details {
  font-weight: 400;
  b {
    font-weight: 400;
    @apply text-yellow-300;
  }
  li {
    margin-top: 4px;
  }
}
</style>
