import { computedEager, useNow } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { computed, watchEffect } from 'vue'

import { useQueryCacheStore } from '../store'
import { dayjs } from '../utils/dayjs'
import { useResetGame } from './useResetGame'

const now = useNow({ interval: 1000 })

export function useGameTime() {
  const queryCacheStore = useQueryCacheStore()
  const { answerMeta } = storeToRefs(queryCacheStore)

  const expTime = computed(() => dayjs(answerMeta.value.data.value?.data?.expTime))

  const timeToExp = computed(() => {
    return dayjs.duration(expTime.value.diff(now.value)).format('HH:mm:ss')
  })

  const isExpired = computedEager(() => {
    return expTime.value.diff(now.value, 'ms', true) < 0
  })

  // ONLY FOR DEBUGGING
  function expireNow() {
    answerMeta.value.data.value = {
      status: { code: 200 },
      data: { answerId: 1, expTime: dayjs().toJSON() },
    }
  }

  const { reset } = useResetGame()

  watchEffect(() => {
    if (isExpired.value) {
      reset()
      answerMeta.value.execute()
    }
  })

  return { timeToExp, expTime, isExpired, expireNow }
}
