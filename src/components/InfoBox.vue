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
  <div class="font-lateef text-3xl leading-10 text-white" dir="rtl">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="py-2 px-8 almaany-title" v-html="data?.matchedResultHTML" />
    <hr class="border-gray-500" />
    <div class="pt-4 pb-6 px-8">
      <ol class="almaany-details list-circle pr-6" v-html="details" />
    </div>
  </div>
</template>

<style lang="postcss">
.almaany-title {
  font-weight: 300;
  b {
    font-weight: 600;
  }
}
.almaany-details {
  font-weight: 300;
  b {
    font-weight: 600;
    @apply text-yellow-300;
  }
  li {
    margin-top: 4px;
  }
}
</style>
