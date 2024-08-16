<template>
  <LoadingSpinner v-if="loading" />
  <q-table
    v-else
    :class="{ 'table-desktop': $q.screen.gt.sm }"
    flat
    bordered
    virtual-scroll
    :rows="diagnostics"
    :columns="columns"
    row-key="name"
    :rows-per-page-options="[15, 20, 25, 50, 0]"
  >
    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
          class="text-uppercase text-primary"
          style="text-align: left"
        >
          {{ $t(col.label) }}
        </q-th>
      </q-tr>
    </template>

    <template v-slot:body-cell-created="props">
      <q-td :props="props" style="text-align: left">
        {{ formatDate(props.row.created, 'YYYY-MM-DD') }}
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { date } from 'quasar';
const { formatDate } = date;
import { storeToRefs } from 'pinia';
import { useDiagnosticStore } from 'src/stores/diagnostic.store';
import { Diagnostic } from 'src/stores/entities/diagnostic.enyity';
import LoadingSpinner from 'src/components/LoadingSpinner.vue';

const props = defineProps<{
  userId: number;
}>();

const columns = [
  // {
  //   name: 'id',
  //   required: true,
  //   label: 'Управление',
  //   align: 'right',
  //   field: (row: Diagnostic) => row.id,
  //   format: (val: string) => `${val}`,
  //   sortable: false,
  // },
  {
    name: 'created',
    required: true,
    label: 'created',
    align: 'left',
    field: (row: Diagnostic) => `${row.created}`,
    format: (val: string) => `${val}`,
    sortable: false,
  },
];

const store = useDiagnosticStore();
const { diagnostics, loading } = storeToRefs(store);
store.load(props.userId);
</script>
