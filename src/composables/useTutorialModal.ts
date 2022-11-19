import { ref } from 'vue'

const showTutorial = ref(false)

export function useTutorialModal() {
  return { showTutorial }
}
