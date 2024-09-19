<template>
  <!-- <pre>{{ circle }}</pre> -->
  <h6>{{ $t(`color${colorNumber}`) }}</h6>
  <section class="row">
    <q-input
      filled
      v-model="circle.color1"
      :rules="['anyColor']"
      class="col-3 q-mr-md field"
      :label="$t('color1')"
    >
      <template v-slot:prepend>
        <div
          class="colorPreview"
          :style="{ backgroundColor: circle.color1 }"
        ></div>
      </template>
      <template v-slot:append>
        <q-icon name="colorize" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-color v-model="circle.color1" @update:model-value="sendColor" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <q-input
      filled
      v-model="circle.color2"
      :rules="['anyColor']"
      class="col-3 q-mr-md field"
      :label="$t('color2')"
    >
      <template v-slot:prepend>
        <div
          class="colorPreview"
          :style="{ backgroundColor: circle.color2 }"
        ></div>
      </template>
      <template v-slot:append>
        <q-icon name="colorize" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-color v-model="circle.color2" @update:model-value="sendColor" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <q-input
      filled
      v-model="circle.color3"
      :rules="['anyColor']"
      class="col-3 q-mr-md field"
      :label="$t('color3')"
    >
      <template v-slot:prepend>
        <div
          class="colorPreview"
          :style="{ backgroundColor: circle.color3 }"
        ></div>
      </template>
      <template v-slot:append>
        <q-icon name="colorize" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-color v-model="circle.color3" @update:model-value="sendColor" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </section>

  <section class="row">
    <q-input
      :label="$t('upTime')"
      class="q-mr-md field"
      filled
      type="number"
      v-model="circle!.upTime"
      min="1"
      max="60"
      lazy-rules
      :rules="[
        (val: string) => (val !== null && val !== '') || 'Введите корректное значение',
        (val: number) => (val >= 1 && val <= 25) || 'Введите корректное значение',
      ]"
      @update:model-value="sendColor"
    />

    <q-input
      :label="$t('constTime')"
      class="q-mr-md field"
      filled
      type="number"
      v-model="circle!.constTime"
      min="1"
      max="60"
      lazy-rules
      :rules="[
        (val: string) => (val !== null && val !== '') || 'Введите корректное значение',
        (val: number) => (+val >= 1 && +val <= 25) || 'Введите корректное значение',
      ]"
      @update:model-value="sendColor"
    />

    <q-input
      :label="$t('downTime')"
      class="q-mr-md field"
      filled
      type="number"
      v-model="circle!.downTime"
      min="1"
      max="60"
      lazy-rules
      :rules="[
        (val: string) => (val !== null && val !== '') || 'Введите корректное значение',
        (val: number) => (+val >= 1 && +val <= 25) || 'Введите корректное значение',
      ]"
      @update:model-value="sendColor"
    />

    <q-input
      :label="$t('speed')"
      class="field"
      filled
      type="number"
      v-model="circle!.speed"
      min="1"
      max="60"
      lazy-rules
      :rules="[
        (val: string) => (val !== null && val !== '') || 'Введите корректное значение',
        (val: number) => (+val >= 1 && +val <= 25) || 'Введите корректное значение',
      ]"
      @update:model-value="sendColor"
    />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { ColorCircle } from 'src/stores/entities/color-circle.entity';

interface Props {
  colorValue: string;
  colorNumber: string;
}

const props = withDefaults(defineProps<Props>(), {
  colorValue: '',
  colorNumber: ',',
});

const emit = defineEmits<{
  (e: 'color-change', value: { colorNumber: string; color: string }): void;
}>();

const circle = ref<ColorCircle>(JSON.parse(props.colorValue));

const sendColor = () => {
  circle.value.upTime = +circle.value.upTime!;
  circle.value.constTime = +circle.value.constTime!;
  circle.value.downTime = +circle.value.downTime!;
  circle.value.speed = +circle.value.speed!;
  emit('color-change', {
    colorNumber: props.colorNumber,
    color: JSON.stringify(circle),
  });
};
</script>

<style lang="scss" scoped>
.field {
  width: 250px;
}
.colorPreview {
  width: 56px;
  height: 56px;
}
</style>
