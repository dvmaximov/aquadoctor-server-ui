<template>
  <section class="q-mx-md q-my-sm">
    <BreathingOrder :userId="userId" />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BreathingOrder from 'src/components/breathing/BreathingOrder.vue';

const userId = ref(1);
</script>
