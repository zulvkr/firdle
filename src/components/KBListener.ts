import { useMagicKeys, whenever } from '@vueuse/core'

import * as hj from '../constants/hijaiy'
import { kbEnterBus } from '../store/eventbus'
import { useGameGridStore } from '../store/gameGrid'

export function useMagicKeyboardListener() {
  const magic = useMagicKeys()
  const { fill, backspace } = useGameGridStore()

  const simpleKeys = [
    hj.ALEF,
    hj.BEH,
    hj.TEH,
    hj.THEH,
    hj.JEEM,
    hj.KHAH,
    hj.HAH,
    hj.DAL,
    hj.THAL,
    hj.REH,
    hj.ZAIN,
    hj.SEEN,
    hj.SHEEN,
    hj.SAD,
    hj.DAD,
    hj.TAH,
    hj.ZAH,
    hj.KAF,
    hj.QAF,
    hj.LAM,
    hj.MEEM,
    hj.NOON,
    hj.WAW,
    hj.HEH,
    hj.YEH,
    hj.ALEF_MAKSURA,
  ]

  for (const key of simpleKeys) {
    whenever(magic[key], () => fill(key))
  }

  for (const key of hj.HAMZAT) {
    whenever(magic[key], () => fill(hj.HAMZA))
  }

  whenever(magic.enter, () => kbEnterBus.emit())

  whenever(magic.backspace, () => backspace())
}
