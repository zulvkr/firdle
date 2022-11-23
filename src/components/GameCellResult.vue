<script setup lang="ts">
export interface GameCellResult {
  rowStatus: 'finished' | 'active' | 'inactive'
  resultStatus: 'loading' | 'exist' | 'not-exist' | null
}

defineProps<GameCellResult>()
</script>

<template>
  <GameCell
    :row-status="rowStatus"
    class="bg-gray-700 hover:bg-gray-600 cursor-pointer"
  >
    <template #indicator>
      <div v-if="rowStatus === 'active'" class="absolute -top-2 -left-3">
        <FIndicator v-if="resultStatus === 'loading'">
          <i-ph-spinner-gap-duotone class="animate-spin" />
        </FIndicator>
        <Transition name="zoom" mode="out-in">
          <FIndicator v-if="resultStatus === 'exist'" class="bg-sky-600">
            <i-ic-baseline-playlist-add-check />
          </FIndicator>
          <FIndicator
            v-else-if="resultStatus === 'not-exist'"
            class="bg-gray-700 border border-gray-500"
          >
            <i-ic-baseline-question-mark transform="scale(-1,1)" font-size="0.8rem" />
          </FIndicator>
        </Transition>
      </div>
      <div
        v-else-if="rowStatus === 'finished'"
        class="absolute top-1 left-1 opacity-30 text-sky-400 group-hover:text-white group-hover:opacity-70 transition-all"
      >
        <i-ic-round-format-list-bulleted />
      </div>
    </template>

    <template #default>
      <slot />
    </template>
  </GameCell>
</template>

<style scoped lang="postcss">
.zoom-enter-active,
.zoom-leave-active {
  transition: transform 0.3s ease;
}

.zoom-enter-from,
.zoom-leave-to {
  transform: scale3d(0, 0, 0);
}
</style>
