<script lang="ts" setup>
import { storeToRefs } from 'pinia'

import {
  AIN,
  ALEF,
  ALEF_HAMZA_ABOVE,
  ALEF_MADDA,
  DAL,
  HAMZA,
  LAM,
  MEEM,
  NOON,
  QAF,
  SEEN,
  SHADDA,
} from '../constants/hijaiy'
import { useSettingsStore } from '../store'

const settingsStore = useSettingsStore()
const { showTutorialAtStart } = storeToRefs(settingsStore)

function toggleTutorialAtStart() {
  showTutorialAtStart.value = !showTutorialAtStart.value
}
</script>

<template>
  <div class="font-IBM p-4">
    <h2 class="text-2xl font-semibold">Cara Bermain</h2>
    <div class="text-lg">
      Tebak <span>فعل</span> wazan
      <span dir="rtl">فَعَّلَ &nbsp;-&nbsp; فَاعَلَ &nbsp;-&nbsp; أَفْعَلَ </span>
    </div>
    <ul class="mt-4 children:mt-2 list-square list-outside ml-6 marker:text-sky-400">
      <li>
        <span>فعل</span> adalah fiil madhi tsulatsi mazid dengan tambahan 1 huruf.
      </li>
      <li>Kamu punya 6 kali kesempatan untuk menebak.</li>
      <li>Warna petak menunjukkan seberapa dekat tebakan kamu.</li>
    </ul>
    <h3 class="mt-8 font-semibold">Contoh</h3>
    <ul class="not-last:children:mb-6 mt-1">
      <li>
        <div dir="rtl" class="text-left">
          <span class="rounded not-first:pr-2 font-medium inline-block">
            <div
              class="aspect-square h-8 border border-gray-700 rounded text-center leading-7"
            >
              {{ QAF }}
            </div>
          </span>
          <span class="rounded not-first:pr-2 font-medium inline-block">
            <div
              class="bg-green-600 aspect-square h-8 border border-gray-700 rounded text-center leading-7"
            >
              {{ ALEF }}
            </div>
          </span>
          <span class="rounded not-first:pr-2 font-medium inline-block">
            <div
              class="aspect-square h-8 border border-gray-700 rounded text-center leading-7"
            >
              {{ AIN }}
            </div>
          </span>
          <span class="rounded not-first:pr-2 font-medium inline-block">
            <div
              class="aspect-square h-8 border border-gray-700 rounded text-center leading-7"
            >
              {{ DAL }}
            </div>
          </span>
        </div>
        <div class="mt-2">
          <span class="bg-green-600 rounded px-1 font-medium">{{ ALEF }}</span>
          ada dalam <span>فعل</span> pada posisi yang tepat
        </div>
      </li>
      <li>
        <div dir="rtl" class="text-left">
          <span class="rounded not-first:pr-2 font-medium inline-block">
            <div
              class="aspect-square h-8 border border-gray-700 rounded text-center leading-7"
            >
              {{ HAMZA }}
            </div>
          </span>
          <span class="rounded not-first:pr-2 font-medium inline-block">
            <div
              class="aspect-square h-8 border border-gray-700 rounded text-center leading-7"
            >
              {{ SEEN }}
            </div>
          </span>
          <span class="rounded not-first:pr-2 font-medium inline-block">
            <div
              class="aspect-square bg-yellow-600 h-8 border border-gray-700 rounded text-center leading-7"
            >
              {{ LAM }}
            </div>
          </span>
          <span class="rounded not-first:pr-2 font-medium inline-block">
            <div
              class="aspect-square h-8 border border-gray-700 rounded text-center leading-7"
            >
              {{ MEEM }}
            </div>
          </span>
        </div>
        <div class="mt-2">
          <span class="bg-yellow-600 rounded px-1 font-medium">{{ LAM }}</span>
          ada dalam <span>فعل</span> tapi pada posisi yang keliru
        </div>
      </li>
      <li>
        <div dir="rtl" class="text-left">
          <span class="rounded not-first:pr-2 font-medium inline-block">
            <div
              class="aspect-square h-8 border border-gray-700 rounded text-center leading-7"
            >
              {{ MEEM }}
            </div>
          </span>
          <span class="rounded not-first:pr-2 font-medium inline-block">
            <div
              class="aspect-square h-8 border border-gray-700 rounded text-center leading-7"
            >
              {{ NOON }}
            </div>
          </span>
          <span class="rounded not-first:pr-2 font-medium inline-block">
            <div
              class="aspect-square h-8 border border-gray-700 rounded text-center leading-7"
            >
              {{ NOON }}
            </div>
          </span>
          <span class="rounded not-first:pr-2 font-medium inline-block">
            <div
              class="bg-dark bg-dark-600 aspect-square bg-gray-700 h-8 border border-gray-700 rounded text-center leading-7"
            >
              {{ AIN }}
            </div>
          </span>
        </div>
        <div class="mt-2">
          <span class="bg-dark-600 rounded px-1 font-medium">{{ AIN }}</span>
          tidak ada dalam <span>فعل</span> pada posisi mana pun
        </div>
      </li>
    </ul>

    <h3 class="mt-8 font-semibold">Kontrol</h3>
    <div class="not-last:children:mb-3 mt-1">
      <ul class="children:mt-2 list-square list-outside ml-6 marker:text-gray-400">
        <li>
          <span class="bg-gray-700 rounded px-1 text-xl">{{ HAMZA }}</span> =
          <span class="bg-gray-700 rounded px-1 text-xl">{{ ALEF_HAMZA_ABOVE }}</span>
        </li>
        <li>
          <span class="bg-gray-700 rounded px-1 text-xl">{{ HAMZA }}</span> +
          <span class="bg-gray-700 rounded px-1 text-xl">{{ ALEF }}</span> =
          <span class="bg-gray-700 rounded px-1 text-xl">{{ ALEF_MADDA }}</span>
        </li>
        <li>
          <span class="bg-gray-700 rounded px-1 text-xl">{{ NOON }}</span> +
          <span class="bg-gray-700 rounded px-1 text-xl">{{ NOON }}</span> =
          <span class="bg-gray-700 rounded px-1 text-xl">{{ NOON + SHADDA }}</span>
        </li>
        <li>
          Klik <span class="bg-sky-600 rounded px-1 font-medium">Enter</span> untuk
          menebak
        </li>
        <li>
          Klik <span class="bg-gray-700 rounded px-1">فعل</span> bertanda
          <span class="bg-sky-600 rounded px-1"
            ><i-ic-baseline-playlist-add-check class="-mb-1"
          /></span>
          untuk melihat entri kamus
        </li>
      </ul>
    </div>
    <div class="mt-8">
      <hr class="border-dotted border-gray-600" />
    </div>
    <div class="mt-4 grid grid-cols-[28px,auto] gap-1 place-items-start">
      <input
        type="checkbox"
        name="show-tutorial"
        class="w-7 mt-1"
        :checked="showTutorialAtStart"
        @change="toggleTutorialAtStart"
      />
      <label for="show-tutorial"> Tampilkan tutorial saat game dimulai </label>
    </div>
  </div>
</template>
