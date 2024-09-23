<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import gsap from 'gsap';

const main = ref();
let tl: any;
let ctx: gsap.Context;

function toggleTimeline() {
  tl.reversed(!tl.reversed());
}

onMounted(() => {
  ctx = gsap.context((self) => {
    const boxes: any = gsap.utils.toArray('.box');
    tl = gsap
      .timeline()
      .fromTo(boxes[0], { opacity: 0 }, { opacity: 1 })
      .to(boxes[1], { x: -120, rotation: -360 }, '<')
      .to(boxes[2], { y: -166 })
      .reverse();
  }, main.value); // <- Scope!
});

onUnmounted(() => {
  ctx.revert(); // <- Easy Cleanup!
});
</script>

<template>
  <main>
    <section class="boxes-container" ref="main">
      <h1>Use the button to toggle a Timeline</h1>
      <div>
        <button @click="toggleTimeline">Toggle Timeline</button>
      </div>
      <div class="box gradient-green">Box 1</div>
      <div class="box gradient-green">Box 2</div>
      <div class="box gradient-green">Box 3</div>
    </section>
  </main>
</template>
