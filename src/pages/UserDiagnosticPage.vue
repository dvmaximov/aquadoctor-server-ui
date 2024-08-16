<template>
  <section class="q-mx-md q-my-sm">
    <h5 class="q-mb-md">{{ $t('diagnosticList') }}</h5>

    <DiagnosticList :userId="userId" />
  </section>
</template>

<script setup lang="ts">
import DiagnosticList from 'src/components/diagnostic/DiagnosticList.vue';
import { useAuthStore } from 'src/stores/auth.store';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const userId = ref<number | undefined>(user.value?.id);
</script>
