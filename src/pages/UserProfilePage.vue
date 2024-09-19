<template>
  <section class="q-mx-md q-my-sm">
    <h5 class="q-mb-xl">{{ $t('userProfile') }}</h5>
    <UserProfile :userId="userId" current />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from 'src/stores/auth.store';
import { storeToRefs } from 'pinia';
import UserProfile from 'src/components/users/UserProfile.vue';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const userId = ref<number | undefined>(user.value?.id);
</script>
