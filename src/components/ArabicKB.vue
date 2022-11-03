<script setup lang="ts">
import { CSSProperties } from 'vue'
import {
  DAD,
  SAD,
  THEH,
  QAF,
  FEH,
  GHAIN,
  AIN,
  HEH,
  KHAH,
  HAH,
  JEEM,
  SHEEN,
  SEEN,
  YEH,
  BEH,
  LAM,
  ALEF,
  TEH,
  NOON,
  MEEM,
  KAF,
  TEH_MARBUTA,
  HAMZA,
  ZAH,
  TAH,
  THAL,
  DAL,
  ZAIN,
  REH,
  WAW,
  ALEF_MAKSURA,
} from '../constants/hijaiy'
import { Button } from './KBButton.vue'
import RawBackspace from '~icons/ic/outline-backspace?raw'
import RawClear from '~icons/ic/round-clear?raw'
import { useGameStore } from '../store/game'
import { useEventBus } from '../store/eventbus'
import { storeToRefs } from 'pinia'

const gameStore = useGameStore()
const { backspace, clearLine, formResult } = gameStore
const { results } = storeToRefs(gameStore)

const eventbus = useEventBus()
const { kbEnter } = eventbus

const rawBackspace = RawBackspace as unknown as string
const rawClear = RawClear as unknown as string

const longCharAdjust: CSSProperties = { marginLeft: '-8px' }

const rotate180: CSSProperties = {
  transform: 'rotate(180deg)',
}

const iconButtonStyle: CSSProperties = {
  fontSize: '16px',
}

const keyboardConfig: Record<string, Button[]> = {
  firstRow: [
    { k: DAD, charStyle: longCharAdjust },
    { k: SAD, charStyle: longCharAdjust },
    { k: THEH },
    { k: QAF },
    { k: FEH },
    { k: GHAIN },
    { k: AIN },
    { k: HEH },
    { k: KHAH },
    { k: HAH },
    { k: JEEM },
  ],
  secondRow: [
    { k: SHEEN, charStyle: longCharAdjust },
    { k: SEEN, charStyle: longCharAdjust },
    { k: YEH },
    { k: BEH },
    { k: LAM },
    { k: ALEF },
    { k: TEH },
    { k: NOON },
    { k: MEEM },
    { k: KAF },
    { k: TEH_MARBUTA },
  ],
  thirdRow: [
    { k: HAMZA },
    { k: ZAH },
    { k: TAH },
    { k: THAL },
    { k: DAL },
    { k: ZAIN },
    { k: REH },
    { k: WAW },
    { k: ALEF_MAKSURA },
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
  ],
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
      charStyle: { width: 'unset' },
      btnWrapperStyle: {
        padding: '0 20px',
        backgroundColor: 'rgba(2, 132, 199, 1)',
      },
    },
  ],
}

gameStore.$subscribe((mutation, state) => {
  const activeRowIndex = state.activeCellIndex[0]
  results.value[activeRowIndex].cellText = formResult(activeRowIndex)
})
</script>

<template>
  <div class="fixed bg-cool-gray-800 bottom-0 left-0 right-0">
    <div class="text-white py-2 py-md-4 px-1 grid">
      <div class="w-full max-w-2xl justify-self-center font-IBM">
        <div class="grid keyboard gap-x-[5px] gap-y-3">
          <KBButton v-for="button in keyboardConfig.firstRow" v-bind="button" />
          <KBButton v-for="button in keyboardConfig.secondRow" v-bind="button" />
          <KBButton v-for="button in keyboardConfig.thirdRow" v-bind="button" />
        </div>
        <div class="grid grid-flow-col gap-x-[5px] justify-end">
          <KBButton v-for="button in keyboardConfig.fourthRow" v-bind="button" />
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
