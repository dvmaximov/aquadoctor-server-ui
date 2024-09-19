<template>
  <q-page class="q-mx-md q-my-sm">
    <!-- <h5>{{ $t('orderedAquadoctor') }}</h5> -->
    <AquadoctorOrders :userId="userId" />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from 'src/stores/auth.store';
import AquadoctorOrders from 'src/components/aquadoctor/AquadoctorOrders.vue';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const userId = user.value ? ref(user.value.id) : ref(0);
</script>
