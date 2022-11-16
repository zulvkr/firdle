import { Ref, ref } from 'vue'

import { useFiilQuery } from '../queries/fetcher'
import { useEventBus } from '../store/eventbus'
import { gameMessages } from './gameMessages'

export function useResultButton(
  resultStatus: Ref<'loading' | 'exist' | 'not-exist' | null>,
  result: Ref<string>
) {
  const eventbus = useEventBus()
  const fiil = useFiilQuery(result)
  const showInfoModal = ref(false)

  async function onClickResult() {
    if (resultStatus.value === 'exist') {
      await fiil.lazyExecute()
      showInfoModal.value = true
    }
    if (resultStatus.value === 'not-exist') {
      eventbus.snackbar({
        status: 'info',
        message: gameMessages.snackbar.fiil_not_in_db,
      })
    }
  }

  return { onClickResult, showInfoModal, fiil }
}
