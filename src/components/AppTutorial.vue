<script lang="ts" setup>
import { ALEF, ALEF_HAMZA_ABOVE, ALEF_MADDA, HAMZA, NOON, SHADDA } from '../constants/hijaiy'
</script>

<template>
  <div class="font-IBM p-4">
    <h2 class="text-2xl font-semibold">Cara Bermain</h2>
    <div class="text-lg">
      Tebak <span>فعل</span> berwazan
      <span dir="rtl"> فَعَّلَ &nbsp;-&nbsp; فَاعَلَ &nbsp;-&nbsp; أَفْعَلَ </span>
    </div>
    <ul class="mt-6 children:mt-2 list-square list-outside ml-6 marker:text-sky-400">
      <li>Kamu punya 6 kali kesempatan untuk menjawab.</li>
      <li>
        Klik <span class="bg-sky-600 rounded px-1 font-medium">Enter</span> untuk
        mengirim jawaban
      </li>
      <li>
        Klik
        <span class="bg-sky-600 rounded px-1"
          ><i-ic-baseline-playlist-add-check class="-mb-1"
        /></span>
        atau <span class="bg-gray-600 rounded px-1">فعل</span> untuk melihat entri kamus
      </li>
    </ul>
    <div class="mt-6 font-semibold">Catatan:</div>
    <div class="children:mt-3">
      <div>
        <span class="bg-gray-700 rounded px-1 text-xl">{{ HAMZA }}</span> =
        <span class="bg-gray-700 rounded px-1 text-xl">{{ ALEF_HAMZA_ABOVE }}</span>
      </div>
      <div>
        <span class="bg-gray-700 rounded px-1 text-xl">{{ HAMZA }} + {{ ALEF }}</span> =
        <span class="bg-gray-700 rounded px-1 text-xl">{{ ALEF_MADDA }}</span>
      </div>
      <div>
        <span class="bg-gray-700 rounded px-1 text-xl">{{ NOON }}</span> +
        <span class="bg-gray-700 rounded px-1 text-xl">{{ NOON }}</span> =
        <span class="bg-gray-700 rounded px-1 text-xl">{{ NOON + SHADDA }}</span>
      </div>
    </div>
    <div class="mt-3"></div>
  </div>
</template>
