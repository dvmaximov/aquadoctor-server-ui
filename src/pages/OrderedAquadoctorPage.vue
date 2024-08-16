<template>
  <section class="q-mx-md q-my-sm">
    <h5>{{ $t('orderedAquadoctor') }}</h5>
    <AquadoctorOrders :userId="userId" />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const userId = ref(1);
import AquadoctorOrders from 'src/components/aquadoctor/AquadoctorOrders.vue';
</script>
