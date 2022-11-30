<script lang="ts" setup>
import { useHead } from '@vueuse/head'

useHead({
  title: 'Tentang Firdle',
  meta: [
    {
      name: 'description',
      content: 'Tentang Firdle',
    },
  ],
})
</script>

<template>
  <div class="grid about-container pt-12 px-4">
    <div class="col-start-2 typography-content">
      <h2 class="text-xl font-medium">Tentang Firdle</h2>
      <p>
        Terinspirasi dari permainan daring Wordle, Firdle adalah permainan tebak kata
        serupa dalam versi "fi'il" atau kata kerja bahasa arab.
      </p>

      <h2 class="text-xl font-medium mt-8">Referensi</h2>
      <p>
        Untuk memainkan permainan ini, pengetahuan dasar tentang ilmu sharaf diperlukan.
      </p>

      <p class="text-xs text-gray-300 uppercase">Referensi Sharaf:</p>
      <ul class="text-sm text-gray-300 children:not-first:mt-2">
        <li>
          <a
            href="https://terjemahmulakhos.wordpress.com/tag/fiil-tsulatsi-mazid/"
            target="_blank"
          >
            Fi'il Tsulatsi Mazid - Terjemah Mulakhos
          </a>
        </li>
        <li>
          <a
            href="https://hahuwa.blogspot.com/2017/02/fiil-tsulatsi-mazid-rubai-tambahan-1.html"
            target="_blank"
          >
            Fi'il Tsulatsi Mazid Ruba'i Tambahan 1 huruf - Hahuwa
          </a>
        </li>
        <li>
          <a
            href="https://en.wiktionary.org/wiki/Category:Arabic_verbs_by_inflection_type"
            target="_blank"
          >
            Arabic verbs inflection type - Wiktionary (See form II, form III, and form
            IV)
          </a>
        </li>
      </ul>
      <div class="mt-10 flex gap-2 flex-wrap">
        <FButton
          class="f-var-small bg-dark-500 !no-underline hover:bg-dark-800"
          href="https://github.com/zulvkr/firdle"
        >
          Firdle on Github
          <i-mdi-github class="ml-1" />
        </FButton>
        <FButton
          class="f-var-small bg-dark-500 !no-underline hover:bg-dark-800"
          href="https://github.com/zulvkr/firdle_s"
        >
          Firdle Server on Github
          <i-mdi-github class="ml-1" />
        </FButton>
      </div>
      <div class="disclaimer text-gray-400 mt-4 text-sm">
        <p>
          Released under the Apache License Version 2 | Copyright © 2022 Ivan Zulfikar
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.grid.about-container {
  grid-template-columns: auto minmax(0, 600px) auto;
}
.typography-content {
  p:not(:first-child) {
    margin-top: 8px;
  }
  a {
    text-decoration: underline;
  }

  .disclaimer {
    p {
      margin-top: 2px;
    }
  }
}
</style>
