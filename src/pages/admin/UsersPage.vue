<template>
  <q-page class="q-mx-md q-my-sm">
    <h5 class="q-mb-xl">{{ $t('userList') }}</h5>
    <UsersList />
  </q-page>
</template>

<script setup lang="ts">
import UsersList from 'src/components/users/UsersList.vue';
</script>
