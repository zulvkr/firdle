<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { CSSProperties, computed } from 'vue'
import RawBackspace from '~icons/ic/outline-backspace?raw'
import RawClear from '~icons/ic/round-clear?raw'

import * as hj from '../constants/hijaiy'
import { useEventBus } from '../store/eventbus'
import { useGameGridStore } from '../store/gameGrid'
import { KBButtonProps } from './KBButton.vue'
import { useMagicKeyboardListener } from './KBListener'

const gameGridStore = useGameGridStore()
const { backspace, clearLine, formResult, gridMap } = gameGridStore
const { results, grid } = storeToRefs(gameGridStore)

const eventbus = useEventBus()
const { kbEnter } = eventbus

useMagicKeyboardListener()

const rawBackspace = RawBackspace as unknown as string
const rawClear = RawClear as unknown as string

const longCharAdjust: CSSProperties = { marginLeft: '-8px' }

const rotate180: CSSProperties = {
  transform: 'rotate(180deg)',
}

const iconButtonStyle: CSSProperties = {
  fontSize: '16px',
}

interface KbConfig {
  firstRow: KBButtonProps[]
  secondRow: KBButtonProps[]
  thirdRow: KBButtonProps[]
  fourthRow: KBButtonProps[]
}

const notExistHuruf = computed(() => {
  const uniqueharf = new Set()
  for (const [r, c] of gridMap) {
    if (grid.value[r][c].cellAnswerMatch === 'missed') {
      uniqueharf.add(grid.value[r][c].cellText)
    }
  }
  return uniqueharf
})

const KBConfig = computed<KbConfig>(() => {
  const addDim = (buttonProps: KBButtonProps) => ({
    ...buttonProps,
    dim: notExistHuruf.value.has(buttonProps.k),
  })
  return {
    firstRow: [
      { k: hj.DAD, charStyle: longCharAdjust },
      { k: hj.SAD, charStyle: longCharAdjust },
      { k: hj.THEH },
      { k: hj.QAF },
      { k: hj.FEH },
      { k: hj.GHAIN },
      { k: hj.AIN },
      { k: hj.HEH },
      { k: hj.KHAH },
      { k: hj.HAH },
      { k: hj.JEEM },
    ].map(addDim),
    secondRow: [
      { k: hj.SHEEN, charStyle: longCharAdjust },
      { k: hj.SEEN, charStyle: longCharAdjust },
      { k: hj.YEH },
      { k: hj.BEH },
      { k: hj.LAM },
      { k: hj.ALEF },
      { k: hj.TEH },
      { k: hj.NOON },
      { k: hj.MEEM },
      { k: hj.KAF },
      { k: hj.TEH_MARBUTA },
    ].map(addDim),
    thirdRow: [
      { k: hj.HAMZA },
      { k: hj.ZAH },
      { k: hj.TAH },
      { k: hj.THAL },
      { k: hj.DAL },
      { k: hj.ZAIN },
      { k: hj.REH },
      { k: hj.WAW },
      { k: hj.ALEF_MAKSURA },
      {
        k: 'Backspace',
        icon: rawBackspace,
        handler: backspace,
        charStyle: { ...iconButtonStyle, ...rotate180 },
        btnStyle: {
          gridColumn: 'span 2 / span 2',
          marginLeft: '10px',
        },
        btnWrapperStyle: {
          backgroundColor: 'rgba(55, 65, 81, 1)',
        },
      },
    ].map(addDim),
    fourthRow: [
      {
        k: 'Clear',
        icon: rawClear,
        handler: clearLine,
        charStyle: { width: 'unset', ...iconButtonStyle },
        btnWrapperStyle: {
          padding: '12px 20px',
          backgroundColor: 'rgba(55, 65, 81, 1)',
        },
      },
      {
        k: 'Enter',
        handler: kbEnter,
        charStyle: { width: 'unset', fontSize: '18px' },
        btnWrapperStyle: {
          padding: '0 20px',
          backgroundColor: 'rgba(2, 132, 199, 1)',
        },
      },
    ],
  }
})

gameGridStore.$subscribe((mutation, state) => {
  const activeRowIndex = state.activeCellIndex[0]
  results.value[activeRowIndex].cellText = formResult(activeRowIndex)
})
</script>

<template>
  <div id="keyboard" class="bg-gray-800 bottom-0 left-0 right-0 z-10">
    <div class="text-white py-1 py-md-4 px-1 grid">
      <div class="w-full max-w-xl justify-self-center font-IBM">
        <div class="grid keyboard gap-x-[5px] gap-y-2">
          <KBButton
            v-for="button in KBConfig.firstRow"
            v-bind="button"
            :key="button.k"
          />
          <KBButton
            v-for="button in KBConfig.secondRow"
            v-bind="button"
            :key="button.k"
          />
          <KBButton
            v-for="button in KBConfig.thirdRow"
            v-bind="button"
            :key="button.k"
          />
        </div>
        <div class="grid grid-flow-col gap-x-[5px] justify-end">
          <KBButton
            v-for="button in KBConfig.fourthRow"
            v-bind="button"
            :key="button.k"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.grid.keyboard {
  grid-auto-flow: row;
  grid-template: auto auto auto auto / repeat(11, minmax(0, 1fr));
}
</style>
