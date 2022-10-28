<script setup lang="ts">
import { ref } from 'vue'

const showAppBar = ref(false)
</script>

<template>
  <div @click="showAppBar = !showAppBar">
    <div class="top-0 right-0 left-0 fixed">
      <div
        :class="[
          'bg-cool-gray-800',
          'grid appbar',
          'h-12 py-1 px-4 sm:h-14 sm:py-2',
          'origin-top transition-transform <sm:scale-y-33',
          !showAppBar && '<sm:transform',
        ]"
      >
        <div class="logo" :class="[!showAppBar && '<sm:hidden']">
          <FirdleLogo class="h-full" />
        </div>
        <div class="settings grid" :class="[!showAppBar && '<sm:hidden']">
          <div class="place-self-center">
            <i-ic-baseline-settings />
          </div>
        </div>
      </div>
      <div class="hidden relative" :class="[!showAppBar && '<sm:block']">
        <div
          class="absolute text-sky-400 right-0 left-0 -top-12 grid smallbar text-xs px-4"
        >
          <div class="logo font-semibold grid">
            <div class="place-self-center">FIRDLE</div>
          </div>
          <div class="arrow">
            <i-ic-baseline-keyboard-arrow-down />
          </div>
        </div>
      </div>
      <hr
        class="border-sky-400 origin-top transition-transform <sm:-translate-y-8"
        :class="[!showAppBar && '<sm:transform']"
      />
    </div>
    <div class="h-4 sm:h-14" />
  </div>
</template>

<style lang="postcss" scoped>
.grid.appbar {
  .logo {
    grid-area: logo;
  }

  .settings {
    grid-area: settings;
  }

  grid-template: 'logo . settings' 40px / 100px 1fr 40px;
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
