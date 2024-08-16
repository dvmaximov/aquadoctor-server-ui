<template>
  <q-select
    class="select choice"
    v-model="locale"
    :options="langOptions"
    dense
    rounded
    outlined
    emit-value
    map-options
    options-dense
    item-aligned
  />
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from 'src/stores/auth.store';

const { locale } = useI18n({ useScope: 'global' });
const authStore = useAuthStore();
const { langOptions } = storeToRefs(authStore);

watch(
  () => locale.value,
  (newLang) => {
    authStore.setLang(newLang);
  }
);

locale.value = authStore.getLang();
</script>

<style lang="scss" scoped>
.choice {
  min-width: 150px;
  border-width: 2px;
}
</style>
