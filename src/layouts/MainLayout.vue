<template>
  <q-layout view="lHh Lpr lFf">
    <header class="flex items-center justify-between header">
      <q-btn
        class="md-hide lg-hide xl-hide"
        :class="{ hidden: disableDrawer }"
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer"
      />

      <q-toolbar-title> Fatigueindex </q-toolbar-title>

      <div class="flex justify-between">
        <SignLinks />
        <LangChoice />
      </div>
    </header>
    <!-- <q-header elevated> -->
    <!-- <q-toolbar> -->

    <!-- </q-toolbar> -->
    <!-- </q-header> -->

    <q-drawer v-model="leftDrawerOpen" show-if-above>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';
import EssentialLink from 'components/EssentialLink.vue';
import LangChoice from 'src/components/header-menu/LangChoice.vue';
import SignLinks from 'src/components/header-menu/SignLinks.vue';

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev',
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev',
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev',
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev',
  },
];

const $q = useQuasar();
const route = useRoute();
const disableDrawer = ref(false);
const leftDrawerOpen = ref(false);
const essentialLinks = ref(linksList);

onMounted(() => {
  $q.dark.set(true);
  // console.log(route.meta.disableDrawer);
  if (route.meta.disableDrawer) {
    disableDrawer.value = true;
    leftDrawerOpen.value = false;
  }
});

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>

<style scoped lang="scss">
.header {
  padding: 0 15px;
  width: 100%;
  height: 56px;
  z-index: 1000;
  border-bottom: 1px solid #525151;
}

.hidden {
  display: none;
}
</style>
