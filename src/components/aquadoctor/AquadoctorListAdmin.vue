<template>
  <LoadingSpinner v-if="loading" />

  <section class="col-12 justify-start q-pa-md">
    <q-uploader
      :url="apiUrl"
      label="Загрузка аудио"
      color="primary"
      field-name="musik"
      accept=".mp3"
      @uploaded="uploaded"
      @failed="failed"
      :multiple="false"
      :headers="[{ name: 'Authorization', value: `Bearer ${token}` }]"
    >
      <template v-slot:header="scope">
        <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
          <q-btn
            v-if="scope.queuedFiles.length > 0"
            icon="clear_all"
            @click="scope.removeQueuedFiles"
            round
            dense
            flat
          >
            <q-tooltip>Очистить</q-tooltip>
          </q-btn>
          <q-btn
            v-if="scope.uploadedFiles.length > 0"
            icon="done_all"
            @click="scope.removeUploadedFiles"
            round
            dense
            flat
          >
            <q-tooltip>Удалить загруженные файлы</q-tooltip>
          </q-btn>
          <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" />
          <div class="col">
            <div class="q-uploader__title">Загрузка аудио файла</div>
            <div class="q-uploader__subtitle">
              {{ scope.uploadSizeLabel }} / {{ scope.uploadProgressLabel }}
            </div>
          </div>
          <q-btn
            v-if="scope.canAddFiles"
            type="a"
            icon="add_box"
            @click="scope.pickFiles"
            round
            dense
            flat
          >
            <q-uploader-add-trigger />
            <q-tooltip>Выбрать файл</q-tooltip>
          </q-btn>
          <q-btn
            v-if="scope.canUpload"
            icon="cloud_upload"
            @click="scope.upload"
            round
            dense
            flat
          >
            <q-tooltip>Загрузить файл</q-tooltip>
          </q-btn>

          <q-btn
            v-if="scope.isUploading"
            icon="clear"
            @click="scope.abort"
            round
            dense
            flat
          >
            <q-tooltip>Abort Upload</q-tooltip>
          </q-btn>
        </div>
      </template>
    </q-uploader>

    <q-table
      class="q-mt-xl"
      :class="{ 'table-desktop': $q.screen.gt.sm }"
      flat
      bordered
      :rows="musikList(searchByName)"
      :columns="columns"
      row-key="name"
      :rows-per-page-options="[15, 20, 25, 50, 0]"
      separator="horizontal"
      @row-click="rowClick"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            class="text-uppercase text-primary"
            style="text-align: center"
          >
            {{ $t(col.label) }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body-cell-name="props">
        <q-td :props="props" style="text-align: left" class="cursor-pointer">
          <div class="flex justify-between q-px-md">
            <div>
              {{ props.row.path }}
            </div>
            <div>
              <q-icon
                name="mdi-chevron-right-circle"
                size="24px"
                color="primary"
              />
            </div>
          </div>
        </q-td>
      </template>

      <template v-slot:top-left>
        <div>
          <q-input
            class="q-mb-md"
            debounce="300"
            outlined
            v-model="searchByName"
            :label="$t('searchByName')"
          ></q-input>
        </div>
      </template>
    </q-table>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useMusikStore } from 'src/stores/musik.store';
import { useMessageStore } from 'src/stores/message.store';
import { useAuthStore } from 'src/stores/auth.store';
import { Musik } from 'src/stores/entities/musik.entity';
import LoadingSpinner from '../LoadingSpinner.vue';
import apiService from 'src/services/api.service';

import { useI18n } from 'vue-i18n';
const { t } = useI18n({ useScope: 'global' });

const columns = [
  {
    name: 'name',
    required: true,
    label: 'musikName',
    align: 'left',
    field: (row: Musik) => `${row.name}`,
    format: (val: string) => `${val}`,
    sortable: false,
  },
];

const router = useRouter();
const musikStore = useMusikStore();
const messageStore = useMessageStore();
const authStore = useAuthStore();
const { token } = storeToRefs(authStore);
musikStore.load();

const { musikList, loading } = storeToRefs(musikStore);
const searchByName = ref('');

const uploaded = async (e: { files: unknown; xhr: XMLHttpRequest }) => {
  await musikStore.load();
  messageStore.success(t(e.xhr.responseText));
};

const failed = async (e: { files: unknown; xhr: XMLHttpRequest }) => {
  const response = JSON.parse(e.xhr.responseText);
  apiService.redirect(response['statusCode'], router);
  messageStore.error(t(response['message']));
};

const { apiUrl } = storeToRefs(musikStore);

const rowClick = (evt: any, row: Musik, index: any) => {
  router.push({ name: 'aquadoctoredit', params: { id: row.id } });
};
</script>

<style scoped lang="scss"></style>
