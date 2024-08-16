<template>
  <q-dialog
    v-model="isShow"
    persistent
    :backdrop-filter="`blur(4px) grayscale(100%)`"
  >
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="delete" color="primary" text-color="white" />
        <div>
          <div class="q-ml-sm">{{ description }}</div>
          <div class="q-ml-sm">{{ message }}</div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat :label="$t('cancel')" color="primary" @click="cancel" />
        <q-btn flat :label="$t('ok')" color="primary" @click="sendOk" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { toRef } from 'vue';

interface Props {
  message?: string;
  description?: string;
}

const props = withDefaults(defineProps<Props>(), {
  message: '',
  description: '',
});
const isShow = toRef(false);

const emit = defineEmits(['ok', 'cancel']);

const sendOk = () => {
  emit('ok');
};

const cancel = () => {
  isShow.value = false;
};

defineExpose({
  isShow,
});
</script>
