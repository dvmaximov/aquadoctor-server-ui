<template>
  <q-form class="q-mt-xl" @submit.prevent.stop="submit">
    <div class="row input items-center">
      <q-select
        class="select"
        v-model="locale"
        :options="langOptions"
        dense
        outlined
        emit-value
        map-options
        options-dense
        item-aligned
      />
      <q-btn
        class="q-ml-sm"
        outline
        color="primary"
        :label="$t('delete')"
        @click="confirmRemove"
      />
      <q-btn
        :disable="!modified"
        class="q-ml-sm"
        outline
        color="primary"
        :label="$t('save')"
        @click="submit"
      />
    </div>
    <div class="row input">
      <q-input
        class="col-7"
        :class="{ 'col-12': $q.screen.lt.md }"
        outlined
        v-model="musikEdit!.name"
        :label="$t('name') + ' *'"
        @update:model-value="modified = true"
        :rules="[
            (val: string) => !!val || $t('required'),
          ]"
      ></q-input>
    </div>
    <div class="row input">
      <q-input
        class="col-7"
        :class="{ 'col-12': $q.screen.lt.md }"
        v-model="description[`${locale}`]"
        :label="$t('description') + ` (${locale})`"
        filled
        type="textarea"
        rows="10"
        @update:model-value="modified = true"
      />
    </div>
    <figure class="row q-mt-xl">
      <figcaption class="q-ma-sm text-primary text-bold q-mb-xl"></figcaption>
      <audio
        controls
        :src="`${musikUrl}/${musikEdit?.path}`"
        class="col-7"
        :class="{ 'col-12': $q.screen.lt.md }"
      ></audio>
    </figure>
  </q-form>

  <ConfirmDialog
    ref="confirmDelete"
    @ok="handleOk"
    :description="$t('deleteRecord')"
    :message="musikEdit!.name"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useMusikStore } from 'src/stores/musik.store';
import { useAuthStore } from 'src/stores/auth.store';
import { Musik } from 'src/stores/entities/musik.entity';
import ConfirmDialog from '../ConfirmDialog.vue';

const musikStore = useMusikStore();
const authStore = useAuthStore();
const { musikUrl } = storeToRefs(musikStore);
const route = useRoute();
const router = useRouter();
const confirmDelete = ref();
const $q = useQuasar();
const musikEdit = ref<Musik | null>(musikStore.getMusikById(+route.params.id));
const modified = ref(false);
const { langOptions } = storeToRefs(authStore);

const locale = ref<string>(authStore.getLang());

const description = ref(
  JSON.parse(musikEdit.value!.description || '') || { ru: '' }
);

if (!description.value[`${locale.value}`]) {
  description.value[`${locale.value}`] = '';
}

watch(
  () => locale.value,
  (newLang) => {
    if (!description.value[`${newLang}`]) {
      description.value[`${newLang}`] = '';
    }
  }
);

const submit = async () => {
  musikEdit.value!.description = JSON.stringify(description.value);
  await musikStore.update(musikEdit.value!);
  modified.value = false;
};

const confirmRemove = () => {
  confirmDelete.value.isShow = true;
};

const handleOk = async () => {
  confirmDelete.value.isShow = false;
  await musikStore.delete(musikEdit.value?.id);
  router.push('/aquadoctor');
};
</script>

<style lang="scss" scoped>
.input {
  margin-top: 15px;
}
.select {
  min-width: 140px;
  padding: 8px;
}
</style>
