<template>
  <section class="q-mx-md q-my-sm">
    <h5>{{ $t('orders') }} Aquadoctor</h5>
  </section>

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
    :rows="aquadoctorList(searchByName)"
    :columns="columns"
    row-key="name"
    :rows-per-page-options="[15, 20, 25, 50, 0]"
    :rows-per-page-label="$t('RowsPerPage')"
    :no-data-label="$t('NoData')"
    separator="cell"
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

    <template v-slot:body-cell-id="props">
      <q-td :props="props">
        <div class="row justify-center">
          <div class="flex justify-end" v-if="correct">
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
          </div>
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

    <template v-slot:body-cell-active="props">
      <q-td :props="props" style="text-align: center; width: 5%">
        {{ props.row.active ? $t('Yes') : $t('No') }}
      </q-td>
    </template>

    <template v-slot:top-left>
      <div class="q-mr-lg">
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

  <ConfirmDialog
    ref="confirmDelete"
    @ok="handleOk"
    :description="$t('deleteRecord')"
    :message="selectedValue?.name"
  />
</template>

<script setup lang="ts">
const columns = [
  {
    name: 'name',
    required: true,
    label: 'musikName',
    align: 'left',
    field: (row: Aquadoctor) => row.name,
    format: (val: string) => `${val}`,
    sortable: false,
  },
  {
    name: 'created',
    required: true,
    label: 'created',
    align: 'left',
    field: (row: Aquadoctor) => row.created,
    format: (val: string) => formatDate(val, 'YYYY/MM/DD'),
    sortable: false,
  },
  {
    name: 'startDate',
    required: true,
    label: 'startDate',
    align: 'left',
    field: (row: Aquadoctor) => row.startDate,
    format: (val: string) => formatDate(val, 'YYYY/MM/DD'),
    sortable: false,
  },
  {
    name: 'endDate',
    required: true,
    label: 'endDate',
    align: 'left',
    field: (row: Aquadoctor) => row.endDate,
    format: (val: string) => formatDate(val, 'YYYY/MM/DD'),
    sortable: false,
  },
  {
    name: 'active',
    required: true,
    label: 'ActiveState',
    align: 'left',
    field: (row: Aquadoctor) => row.active,
    format: (val: string) => `${val}`,
    sortable: false,
  },
  {
    name: 'id',
    required: true,
    label: 'blank',
    align: 'left',
    field: (row: Aquadoctor) => row.id,
    format: (val: string) => `${val}`,
    sortable: false,
  },
];

import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { date } from 'quasar';
const { formatDate } = date;
import { useRoute, useRouter } from 'vue-router';
import { useAquadoctorStore } from 'src/stores/aquadoctor.store';
import { Aquadoctor } from 'src/stores/entities/aquadoctor.entity';
import LoadingSpinner from 'src/components/LoadingSpinner.vue';
import ConfirmDialog from '../ConfirmDialog.vue';

interface Props {
  userId?: number;
  correct?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  userId: 0,
  correct: false,
});

const route = useRoute();
const router = useRouter();
const store = useAquadoctorStore();
const { aquadoctorList, loading } = storeToRefs(store);
const searchByName = ref('');
const confirmDelete = ref();
const selectedValue = ref<Aquadoctor | null>(null);

const idOfUser = route.params.userId ? +route.params.userId : props.userId;
store.load(idOfUser);

const edit = (value: Aquadoctor) => {
  router.push({ name: 'AquadoctorEdit', params: { orderId: value.id } });
};

const handleOk = async () => {
  confirmDelete.value.isShow = false;
  await store.delete(selectedValue.value?.id);
  await store.load(idOfUser);
};

const confirmRemove = (value: Aquadoctor) => {
  selectedValue.value = value;
  confirmDelete.value.isShow = true;
};
</script>

<style scoped lang="scss">
.item-control-delete {
  color: $field-error;
}
</style>
