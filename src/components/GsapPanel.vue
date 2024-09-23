<template>
  <div class="wrapper">
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { gsap } from 'gsap';

// interface Props {
//   userId?: number;
//   correct?: boolean;
// }

// const props = withDefaults(defineProps<Props>(), {
//   userId: 0,
//   correct: false,
// });
</script>
