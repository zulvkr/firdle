<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useTutorialModal } from '../composables'

const { showTutorial } = useTutorialModal()

function onInfoClick() {
  showTutorial.value = !showTutorial.value
}

const route = useRoute()
const logoRouteTo = computed(() => (route.path === '/about' ? '/' : '/about'))
</script>

<template>
  <FAppBar>
    <template #appbar-content>
      <div class="grid appbar">
        <div class="logo">
          <RouterLink :to="logoRouteTo">
            <FirdleLogo class="h-full" />
          </RouterLink>
        </div>
        <div class="hints grid">
          <FButton
            v-if="route.path === '/'"
            class="hover:bg-opacity-10 bg-sky-400 bg-opacity-0"
            @click="onInfoClick"
          >
            Cara Bermain <i-ic-baseline-info class="ml-2" />
          </FButton>
          <FButton v-else class="hover:bg-opacity-10 bg-sky-400 bg-opacity-0" to="/">
            Kembali ke Permainan <i-ic-round-videogame-asset class="ml-2" />
          </FButton>
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

  grid-template: 'logo . hints' 40px / 100px 1fr minmax(0, auto);
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
