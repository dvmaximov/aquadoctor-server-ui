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
    :rows="musikList(searchByName)"
    :columns="columns"
    row-key="name"
    :rows-per-page-options="[15, 20, 25, 50, 0]"
    :rows-per-page-label="$t('RowsPerPage')"
    :no-data-label="$t('NoData')"
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

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td auto-width>
          <q-btn
            class="q-mr-xl"
            size="sm"
            color="primary"
            round
            dense
            @click="props.expand = !props.expand"
            :icon="props.expand ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          />
          {{ props.row.name }}
        </q-td>
      </q-tr>
      <q-tr v-show="props.expand" :props="props">
        <q-td>
          <q-card>
            <q-card-section style="white-space: wrap">
              {{ JSON.parse(props.row.description)[langValue] || '' }}
            </q-card-section>
            <q-card-actions>
              <q-btn
                class="q-ml-sm"
                outline
                color="primary"
                :label="$t('order')"
                @click="order(props.row.id)"
              />
            </q-card-actions>
          </q-card>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import LoadingSpinner from 'src/components/LoadingSpinner.vue';
import { Musik } from 'src/stores/entities/musik.entity';
import { useMusikStore } from 'src/stores/musik.store';
import { useAquadoctorStore } from 'src/stores/aquadoctor.store';
import { useAuthStore } from 'src/stores/auth.store';

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

const musikStore = useMusikStore();
const authStore = useAuthStore();
const aquadoctorStore = useAquadoctorStore();
const { user } = storeToRefs(authStore);
musikStore.load();
const { loading, musikList } = storeToRefs(musikStore);
const { langValue } = storeToRefs(authStore);
const searchByName = ref('');

const order = async (musikId: number) => {
  aquadoctorStore.insert(user.value!.id!, musikId);
};
</script>
