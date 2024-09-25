<template>
  <LoadingSpinner v-if="!ready" />
  <div v-else class="row">
    <section class="q-mx-md q-my-lg col-11 min-height-87vh">
      <q-card class="full-height">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
        >
          <q-tab name="profile" :label="$t('profile')" />
          <q-tab name="diagnostic" :label="$t('diagnostic')" />
          <q-tab name="orders" :label="$t('orders')" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="profile" class="q-pa-none no-scroll-y">
            <div class="q-pa-md">
              <UserProfile :userId="userId" />
            </div>
          </q-tab-panel>

          <q-tab-panel name="diagnostic" class="q-pa-none no-scroll-y">
            <div class="q-pa-md">
              <DiagnosticList :userId="userId" />
            </div>
          </q-tab-panel>

          <q-tab-panel name="orders" class="q-pa-none no-scroll-y">
            <div class="q-pa-md">
              <AquadoctorOrders :userId="userId" correct />
              <BreathingOrder :userId="userId" />
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import UserProfile from 'src/components/users/UserProfile.vue';
import DiagnosticList from 'src/components/diagnostic/DiagnosticList.vue';
import AquadoctorOrders from 'src/components/aquadoctor/AquadoctorOrders.vue';
import BreathingOrder from 'src/components/breathing/BreathingOrder.vue';
import LoadingSpinner from 'src/components/LoadingSpinner.vue';
import { useUsersStore } from 'src/stores/users.store';

const userStore = useUsersStore();
const ready = ref(false);
const route = useRoute();
const userId = +route.params.userId;
const tab = ref('profile');

userStore.load().then(() => {
  ready.value = true;
  console.log(ready.value);
});
</script>
