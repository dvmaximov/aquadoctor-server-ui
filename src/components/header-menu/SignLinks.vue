<template>
  <div v-if="!isAuth" class="flex justify-between items-center q-mr-lg">
    <router-link
      class="q-mr-md link"
      v-for="link of linkList"
      :key="link.label"
      :to="`${link.link}`"
      >{{ $t(`${link.label}`) }}</router-link
    >
  </div>
  <div v-else class="flex justify-between items-center q-mr-lg">
    <div class="q-mr-md">
      <router-link class="q-mr-md link" :to="`/users`">{{
        `${user!.firstName} ${user!.lastName}`
      }}</router-link>
    </div>
    <div @click="signOut" class="q-mr-md link">{{ $t('signout') }}</div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from 'src/stores/auth.store';
const linkList = [
  {
    label: 'signin',
    link: '/signin',
  },
  {
    label: 'signup',
    link: '/signup',
  },
];

const router = useRouter();
const store = useAuthStore();
const { isAuth, user } = storeToRefs(store);

watch(
  () => isAuth.value,
  (value) => {
    if (value) router.push('/profile');
  }
);

const signOut = () => {
  store.signOut();
  router.push('/');
};
</script>

<style scoped lang="scss">
.link {
  transition: all 0.5s;
  color: $text;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    color: $light-text;
  }
}
</style>
