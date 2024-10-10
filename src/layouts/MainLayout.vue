<template>
  <q-layout view="lHh Lpr lFf">
    <div
      v-if="loading"
      class="flex items-center justify-center min-height-100vh min-width-100vw"
    >
      <LoadingSpinner />
    </div>

    <div v-else>
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

        <div
          class="flex justify-between"
          :class="{ 'full-width': $q.screen.lt.md }"
        >
          <SignLinks />
          <LangChoice class="sm-hide xs-hide" />
        </div>
      </header>

      <q-drawer
        v-if="!disableDrawer"
        v-model="leftDrawerOpen"
        :class="{ 'drawer-filled': $q.screen.lt.md }"
      >
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
            :label="$t('YouOrders')"
            ><div class="q-pl-xl">
              <EssentialLink
                v-for="link in ordered"
                :key="$t(link.title)"
                v-bind="link"
              />
            </div>
          </q-expansion-item>

          <q-separator />

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
    </div>
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
import { useMessageStore } from 'src/stores/message.store';
import LoadingSpinner from 'src/components/LoadingSpinner.vue';

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
  {
    title: 'aquadoctorOrder',
    caption: '',
    icon: '',
    link: `/aquadoctororder`,
  },
  {
    title: 'breathingOrder',
    caption: '',
    icon: '',
    link: `/breathingorder`,
  },
  {
    title: 'download',
    caption: '',
    icon: '',
    link: `/download`,
  },
];

const ordered = [
  {
    title: 'aquadoctor',
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
const messageStore = useMessageStore();
const { links, isHasAdminLinks, loading } = storeToRefs(authStore);
const $q = useQuasar();
const route = useRoute();
const disableDrawer = ref(route.meta.disableDrawer as boolean);
const leftDrawerOpen = ref(true);
const essentialLinks = ref(linksList);

authStore.getToken();

watch(
  () => route.path,
  () => {
    if ($q.screen.lt.md) {
      leftDrawerOpen.value = false;
    } else {
      leftDrawerOpen.value = !route.meta.disableDrawer as boolean;
    }

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
  flex-wrap: nowrap;
}
.logo {
  text-decoration: none;
  color: $text;
}
.hidden {
  display: none;
}
</style>
