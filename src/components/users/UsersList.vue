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
    :rows="usersList(searchByName, searchByEmail)"
    :columns="columns"
    row-key="name"
    :rows-per-page-options="[15, 20, 25, 50, 0]"
    :rows-per-page-label="$t('RowsPerPage')"
    :no-data-label="$t('NoData')"
    separator="vertical"
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

    <template v-slot:body-cell-email="props">
      <q-td :props="props" style="text-align: left">
        {{ props.row.email }}
      </q-td>
    </template>

    <template v-slot:body-cell-active="props">
      <q-td :props="props" style="text-align: center; width: 5%">
        <!-- <div class="q-pa-md">
          <q-checkbox v-model="props.row.active" />
        </div> -->
        {{ props.row.active ? $t('Yes') : $t('No') }}
      </q-td>
    </template>

    <template v-slot:body-cell-id="props">
      <q-td :props="props">
        <div class="row justify-end">
          <div class="flex justify-end item-control">
            <div class="q-gutter-xs">
              <!-- <q-btn
                    class="q-mr-sm"
                    size="12px"
                    flat
                    dense
                    round
                    icon="edit"
                    @click.stop.capture="showEdit(props.row)"
                  >
                    <q-tooltip>Редактировать</q-tooltip>
                  </q-btn> -->
              <!-- <q-btn
                    class="q-mr-sm"
                    size="12px"
                    flat
                    dense
                    round
                    icon="login"
                    @click.stop.capture="showActions(props.row)"
                  >
                    <q-tooltip>Список действий</q-tooltip>
                  </q-btn> -->
              <!-- <q-btn
                    class="q-mr-sm"
                    size="12px"
                    flat
                    dense
                    round
                    icon="download"
                    @click.stop.capture="confirmMoveToStation(props.row)"
                  >
                    <q-tooltip>Передать на станцию</q-tooltip>
                  </q-btn> -->
              <!-- <q-btn
                    class="q-mr-sm"
                    size="12px"
                    flat
                    dense
                    round
                    icon="delete"
                    @click.stop.capture="confirmDelete(props.row.id)"
                  >
                    <q-tooltip>Удалить на сервере</q-tooltip>
                  </q-btn> -->
            </div>
          </div>
        </div>
      </q-td>
    </template>

    <template v-slot:top-left>
      <div class="q-mr-lg">
        <q-input
          class="q-mb-md"
          debounce="300"
          outlined
          v-model="searchByName"
          @update:model-value="searchByEmail = ''"
          :label="$t('searchByName')"
        ></q-input>
      </div>
      <div>
        <q-input
          class="q-mb-md"
          debounce="300"
          outlined
          v-model="searchByEmail"
          @update:model-value="searchByName = ''"
          :label="$t('searchByEmail')"
        ></q-input>
      </div>
    </template>

    <template v-slot:top-right>
      <div>
        <!-- <q-btn
              outline
              color="primary"
              label="Добавить"
              @click="addTask()"
              class="q-mr-xs"
            />
            <q-btn
              outline
              color="primary"
              label="Обновить"
              @click="refreshTasks()"
            /> -->
      </div>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { User } from 'src/stores/entities/users.entity';
import { useUsersStore } from 'src/stores/users.store';
import { useRouter } from 'vue-router';
import LoadingSpinner from 'src/components/LoadingSpinner.vue';

const columns = [
  {
    name: 'email',
    required: true,
    label: 'email',
    align: 'right',
    field: (row: User) => row.email,
    format: (val: string) => `${val}`,
    sortable: false,
  },
  {
    name: 'name',
    required: true,
    label: 'userName',
    align: 'left',
    field: (row: User) => `${row.firstName} ${row.lastName}`,
    format: (val: string) => `${val}`,
    sortable: false,
  },
  {
    name: 'role',
    required: true,
    label: 'role',
    align: 'left',
    field: (row: User) => row.role,
    format: (val: string) => `${val}`,
    sortable: false,
  },
  {
    name: 'active',
    required: true,
    label: 'ActiveState',
    align: 'left',
    field: (row: User) => row.active,
    format: (val: string) => `${val}`,
    sortable: false,
  },
  // {
  //   name: 'id',
  //   required: true,
  //   label: 'control',
  //   align: 'right',
  //   field: (row: User) => row.id,
  //   format: (val: string) => `${val}`,
  //   sortable: false,
  // },
];

const router = useRouter();
const store = useUsersStore();
const { usersList, loading } = storeToRefs(store);
const searchByName = ref('');
const searchByEmail = ref('');

store.load();

const rowClick = (evt: any, row: User, index: any) => {
  router.push({ name: 'usercard', params: { userId: row.id } });
};
</script>
