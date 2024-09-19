<template>
  <h5>{{ $t('AquadoctorEdit') }}</h5>

  <q-form
    class="q-gutter-md q-mt-lg"
    :class="{ 'table-desktop': $q.screen.gt.sm }"
    @submit.prevent.stop="submit"
  >
    <q-field borderless>
      <div class="self-center no-outline label">
        <span>{{ $t('created') }}: </span>
        {{ formatDate(aquadoctorEdit?.created, 'YYYY/MM/DD') }}
        <q-btn
          :disable="!modified"
          outline
          class="q-ml-xl"
          color="primary"
          type="submit"
          :label="$t('save')"
        />
      </div>
    </q-field>

    <q-separator inset />

    <section class="row">
      <q-input
        outlined
        v-model="startDate"
        mask="date"
        @update:model-value="modified = true"
        :rules="['date']"
        :label="$t('startDate') + ' *'"
        class="col-4 q-mr-md"
        :class="{ 'col-12': $q.screen.lt.md }"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                v-model="startDate"
                :title="startDate"
                :subtitle="$t('startDate')"
              >
                <div class="row items-center justify-end">
                  <q-btn
                    v-close-popup
                    :label="$t('close')"
                    color="primary"
                    flat
                  />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-input
        outlined
        v-model="endDate"
        mask="date"
        @update:model-value="modified = true"
        :rules="['date']"
        :label="$t('endDate') + ' *'"
        class="col-4 q-mr-md"
        :class="{ 'col-12': $q.screen.lt.md }"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                v-model="endDate"
                :title="endDate"
                :subtitle="$t('endDate')"
              >
                <div class="row items-center justify-end">
                  <q-btn
                    v-close-popup
                    :label="$t('close')"
                    color="primary"
                    flat
                  />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-checkbox
        v-model="active"
        :label="$t('ActiveState')"
        class="col-3 q-mr-md"
        @update:model-value="modified = true"
      />
    </section>
    <q-separator inset />

    <ColorCircle
      :color-value="aquadoctorEdit?.color1"
      color-number="1"
      @color-change="onColorChange"
    />
    <q-separator inset />
    <ColorCircle
      :color-value="aquadoctorEdit?.color2"
      color-number="2"
      @color-change="onColorChange"
    />
    <q-separator inset />
    <ColorCircle
      :color-value="aquadoctorEdit?.color3"
      color-number="3"
      @color-change="onColorChange"
    />
  </q-form>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { date } from 'quasar';
const { formatDate, extractDate } = date;
import { useAquadoctorStore } from 'src/stores/aquadoctor.store';
import { Aquadoctor } from 'src/stores/entities/aquadoctor.entity';
import ColorCircle from 'src/components/aquadoctor/ColorCircle.vue';

const route = useRoute();
const id = +route.params.orderId;

const store = useAquadoctorStore();

const aquadoctorEdit = ref<Aquadoctor | null>(null);
aquadoctorEdit.value = store.getAquadoctorById(id);

const modified = ref(false);

const startDate = ref(
  formatDate(aquadoctorEdit.value?.startDate, 'YYYY/MM/DD')
);
const endDate = ref(formatDate(aquadoctorEdit.value?.endDate, 'YYYY/MM/DD'));
const active = ref<boolean>(aquadoctorEdit.value?.active || false);

const submit = async () => {
  modified.value = false;
  if (!aquadoctorEdit.value) return;
  aquadoctorEdit.value.active = active.value;
  aquadoctorEdit.value.startDate = extractDate(
    startDate.value,
    'YYYY/MM/DD'
  ).getTime();
  aquadoctorEdit.value.endDate = extractDate(
    endDate.value,
    'YYYY/MM/DD'
  ).getTime();
  store.update(aquadoctorEdit.value);
};

const onColorChange = (color: { colorNumber: string; color: string }) => {
  if (!aquadoctorEdit.value) return;
  switch (color.colorNumber) {
    case '1':
      aquadoctorEdit.value['color1'] = color.color;
      break;
    case '2':
      aquadoctorEdit.value['color2'] = color.color;
      break;
    case '3':
      aquadoctorEdit.value['color3'] = color.color;
      break;
    default:
      return;
  }

  modified.value = true;
};
</script>
