<template>
  <LoadingSpinner v-if="loading" />
  <q-table
    v-else
    :class="{
      'table-desktop': $q.screen.gt.sm,
      'height-80vh': $q.screen.gt.sm,
    }"
    flat
    bordered
    virtual-scroll
    :rows="diagnostics"
    :columns="columns"
    row-key="name"
    :rows-per-page-options="[15, 20, 25, 50, 0]"
    separator="horizontal"
  >
    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
          class="text-uppercase text-primary"
          :class="{ right: col.name === 'id' }"
        >
          {{ $t(col.label) }}
        </q-th>
      </q-tr>
    </template>

    <template v-slot:body-cell-created="props">
      <q-td :props="props" style="text-align: left">
        {{ formatDate(+props.row.created, 'YYYY-MM-DD --- HH:MM a') }}
      </q-td>
    </template>

    <template v-slot:body-cell-metaData="props">
      <q-td :props="props" style="text-align: left">
        <div class="q-mb-sm">{{ $t('metaDataAquadoctorLabel') }}</div>
        <div v-for="(item, key) in getMetaData(props.row.metaData)" :key="key">
          <div>{{ item }}</div>
        </div>
      </q-td>
    </template>

    <template v-slot:body-cell-id="props">
      <q-td :props="props">
        <div class="row justify-end">
          <!-- <div class="flex justify-end" v-if="correct">
            <div class="q-gutter-xs">
              <q-btn
                class="q-mr-sm"
                size="12px"
                flat
                dense
                round
                icon="edit"
                color="primary"
                @click.stop.capture="edit(props.row)"
              >
                <q-tooltip>{{ $t('edit') }}</q-tooltip>
              </q-btn>
            </div>
          </div> -->
          <div class="item-control-delete">
            <div class="q-gutter-xs">
              <q-btn
                class="q-mr-sm"
                size="12px"
                flat
                dense
                round
                icon="mdi-close-circle"
                @click.stop.capture="confirmRemove(props.row)"
              >
                <q-tooltip>{{ $t('delete') }}</q-tooltip>
              </q-btn>
            </div>
          </div>
        </div>
      </q-td>
    </template>
  </q-table>

  <ConfirmDialog
    ref="confirmDelete"
    @ok="handleOk"
    :description="$t('deleteRecord')"
    :message="formatDate(selectedValue?.created, 'YYYY-MM-DD  HH-MM a')"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { date } from 'quasar';
const { formatDate } = date;
import { storeToRefs } from 'pinia';
import { useDiagnosticStore } from 'src/stores/diagnostic.store';
import { Diagnostic } from 'src/stores/entities/diagnostic.enyity';
import ConfirmDialog from '../ConfirmDialog.vue';
import LoadingSpinner from 'src/components/LoadingSpinner.vue';

const props = defineProps<{
  userId: number;
}>();

const columns = [
  {
    name: 'created',
    required: true,
    label: 'created',
    align: 'left',
    field: (row: Diagnostic) => `${row.created}`,
    format: (val: string) => `${val}`,
    sortable: false,
  },
  {
    name: 'metaData',
    required: true,
    label: 'blank',
    align: 'left',
    field: (row: Diagnostic) => row.metaData,
    format: (val: string) => `${val}`,
    sortable: false,
  },
  {
    name: 'id',
    required: true,
    label: 'blank',
    align: 'right',
    field: (row: Diagnostic) => row.id,
    format: (val: string) => `${val}`,
    sortable: false,
  },
];

const store = useDiagnosticStore();
const { diagnostics, loading } = storeToRefs(store);
const confirmDelete = ref();
const selectedValue = ref<Diagnostic | null>(null);

store.load(props.userId);

const handleOk = async () => {
  confirmDelete.value.isShow = false;
  await store.delete(selectedValue.value?.id);
  await store.load(props.userId);
};

const confirmRemove = (value: Diagnostic) => {
  selectedValue.value = value;
  confirmDelete.value.isShow = true;
};

const getMetaData = (metaData: string): any => {
  const meta = JSON.parse(metaData);
  if (meta['aquadoctor'] == null) return {};
  return meta['aquadoctor'];
};
</script>

<style scoped lang="scss">
.item-control-delete {
  color: $field-error;
}
.left {
  text-align: left;
}
.center {
  text-align: center;
}
</style>
