<template>
  <section class="q-mx-md q-my-sm">
    <h5>{{ $t('aquadoctor') }}</h5>
    <AquadoctorListAdmin />
  </section>
</template>

<script setup lang="ts">
import AquadoctorListAdmin from 'src/components/aquadoctor/AquadoctorListAdmin.vue';
</script>
