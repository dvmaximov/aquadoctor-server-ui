<template>
  <q-layout view="lHh Lpr lFf">
    <header class="flex items-center justify-between fixed-top header">
      <q-btn
        class="md-hide lg-hide xl-hide"
        v-if="!disableDrawer"
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer"
      />

      <router-link class="q-mr-md logo sm-hide xs-hide" to="/"
        ><q-toolbar-title> Fatigueindex </q-toolbar-title></router-link
      >

      <div class="flex justify-between">
        <SignLinks />
        <LangChoice class="sm-hide xs-hide" />
      </div>
    </header>

    <q-drawer v-if="!disableDrawer" v-model="leftDrawerOpen">
      <q-list>
        <LangChoice class="md-hide lg-hide xl-hide" />
        <q-separator />
        <!-- <q-item-label header> Fatigueindex </q-item-label> -->

        <q-list class="q-mx-md q-mt-lg">
          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-list>

        <q-expansion-item
          class="q-mx-md q-mb-lg"
          expand-separator
          icon=""
          :label="$t('orderedPrograms')"
          ><div class="q-pl-xl">
            <EssentialLink
              v-for="link in ordered"
              :key="$t(link.title)"
              v-bind="link"
            />
          </div>
        </q-expansion-item>

        <q-expansion-item
          v-if="isHasAdminLinks"
          expand-separator
          icon="mdsecurity"
          :label="$t('administrator')"
          ><div class="q-pl-xl">
            <EssentialLink
              v-for="link in links"
              :key="$t(link.title)"
              v-bind="link"
            />
          </div>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container style="padding-top: 60px">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import EssentialLink from 'components/EssentialLink.vue';
import LangChoice from 'src/components/header-menu/LangChoice.vue';
import SignLinks from 'src/components/header-menu/SignLinks.vue';
import { useAuthStore } from 'src/stores/auth.store';

const linksList = [
  {
    title: 'profile',
    caption: '',
    icon: '',
    link: '/profile',
  },
  {
    title: 'diagnostic',
    caption: '',
    icon: '',
    link: `/diagnostic`,
  },
];

const ordered = [
  {
    title: 'orderedAquadoctor',
    caption: '',
    icon: '',
    link: '/orderedAquadoctor',
  },
  {
    title: 'orderedBreathing',
    caption: '',
    icon: '',
    link: `/orderedBreathing`,
  },
];

const authStore = useAuthStore();
authStore.getToken();
const { links, isHasAdminLinks } = storeToRefs(authStore);
const $q = useQuasar();
const route = useRoute();
const disableDrawer = ref(true);
const leftDrawerOpen = ref(true);
const essentialLinks = ref(linksList);

watch(
  () => route.path,
  () => {
    leftDrawerOpen.value = !route.meta.disableDrawer as boolean;
    disableDrawer.value = route.meta.disableDrawer as boolean;
  }
);

onMounted(() => {
  $q.dark.set(true);
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
  background: var(--q-dark);
}
.logo {
  text-decoration: none;
  color: $text;
}
.hidden {
  display: none;
}
</style>
