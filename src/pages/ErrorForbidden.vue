<template>
  <div class="text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">403</div>

      <div class="text-h2" style="opacity: 0.4">
        {{ $t('forbidden') }}
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script setup lang="ts"></script>
