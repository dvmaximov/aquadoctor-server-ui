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
import { useI18n } from 'vue-i18n';

const { locale } = useI18n({ useScope: 'global' });
const langOptions = [
  { label: 'Русский', value: 'ru' },
  { label: 'English', value: 'en-US' },
];
</script>

<style lang="scss" scoped>
.choice {
  min-width: 150px;
  border-width: 2px;
}
</style>
