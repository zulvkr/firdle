<script lang="ts" setup>
import { useTutorialModal } from '../composables/useTutorialModal'

const { showTutorial } = useTutorialModal()

function onInfoClick() {
  showTutorial.value = !showTutorial.value
}
</script>

<template>
  <FAppBar>
    <template #appbar-content>
      <div class="grid appbar">
        <div class="logo">
          <FirdleLogo class="h-full" />
        </div>
        <div class="hints grid">
          <div class="place-self-center" @click="onInfoClick">
            <i-ic-baseline-info />
          </div>
        </div>
        <div class="settings grid">
          <div class="place-self-center">
            <i-ic-baseline-settings />
          </div>
        </div>
      </div>
    </template>
    <template #smallbar-content>
      <div class="text-gray-300 grid smallbar text-xs">
        <div class="logo font-semibold grid">
          <div class="place-self-center">FIRDLE</div>
        </div>
        <div class="arrow">
          <i-ic-baseline-keyboard-arrow-down />
        </div>
      </div>
    </template>
  </FAppBar>
</template>

<style lang="postcss" scoped>
.grid.appbar {
  .logo {
    grid-area: logo;
  }

  .hints {
    grid-area: hints;
  }

  .settings {
    grid-area: settings;
  }

  grid-template: 'logo . hints settings' 40px / 100px 1fr 40px 40px;
}

.grid.smallbar {
  .logo {
    grid-area: logo;
  }

  .arrow {
    grid-area: arrow;
  }

  grid-template: '. logo arrow' 16px / 24px 1fr 24px;
}
</style>
