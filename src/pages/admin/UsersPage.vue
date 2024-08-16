<template>
  <section class="q-mx-md q-my-sm">
    <h4 class="q-mb-xl">{{ $t('userList') }}</h4>
    <UsersList />
  </section>
</template>

<script setup lang="ts">
import UsersList from 'src/components/users/UsersList.vue';
</script>
