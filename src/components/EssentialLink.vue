<template>
  <q-item>
    <router-link class="q-mr-md link" :to="`${link}`">
      <q-item-section v-if="icon" avatar>
        <q-icon :name="icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ $t(title) }}</q-item-label>
        <q-item-label caption>{{ caption }}</q-item-label>
      </q-item-section>
    </router-link>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: '',
    },

    link: {
      type: String,
      default: '#',
    },

    icon: {
      type: String,
      default: '',
    },
  },
});
</script>
<style lang="scss" scoped>
.link {
  text-decoration: none;
  color: $text;
  // font-weight: bold;
  font-size: 16px;
  line-height: 1.2em !important;

  &:hover {
    color: $primary;
  }
}
</style>
