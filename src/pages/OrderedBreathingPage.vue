<template>
  <section class="q-mx-md q-my-sm">
    <h5>{{ $t('orderedBreathing') }}</h5>
    <BreathingOrders :userId="userId" />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BreathingOrders from 'src/components/breathing/BreathingOrders.vue';

const userId = ref(1);
</script>
