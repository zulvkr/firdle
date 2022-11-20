<script lang="ts" setup>
import { ALEF_HAMZA_ABOVE, HAMZA, NOON, SHADDA } from '../constants/hijaiy'
</script>

<template>
  <div class="font-IBM p-4">
    <h2 class="text-2xl font-bold">Cara Bermain</h2>
    <div class="children:mt-6">
      <div>Tebak <span>فعل</span> dalam 6 kali kesempatan</div>
      <div>
        <span>فعل</span> adalah fi'il madhi tsulatsi mazid dengan tambahan 1 huruf,
        mengikuti wazan:
        <div dir="rtl" class="text-xl mt-2 text-center">
          فَعَّلَ &nbsp;-&nbsp; فَاعَلَ &nbsp;-&nbsp; أَفْعَلَ
        </div>
      </div>
      <div>
        Klik <span class="bg-sky-600 rounded px-1">Enter</span> untuk mengirim jawaban
      </div>
    </div>
    <div class="mt-6 font-semibold">Catatan:</div>
    <div class="children:mt-3">
      <div>
        <span class="bg-gray-700 rounded px-1 text-xl">{{ HAMZA }}</span> =
        <span class="bg-gray-700 rounded px-1 text-xl">{{ ALEF_HAMZA_ABOVE }}</span>
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
