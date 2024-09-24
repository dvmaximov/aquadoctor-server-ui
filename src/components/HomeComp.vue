<template>
  <main :class="{ 'slogan--wrap': $q.screen.lt.md }" class="slogan">
    <section class="slogan__left" ref="slogan__left">
      <div class="slogan-text slogan__item left1">
        <h4 class="slogan-text__title">
          {{ $t('sloganTitle1') }}
        </h4>
        <p class="slogan-text__content">
          {{ $t('slogan1') }}
        </p>
      </div>
      <img src="images/phone3.png" alt="" class="slogan__item left2" />
      <div class="slogan-text slogan__item left3">
        <h4 class="slogan-text__title">
          {{ $t('sloganTitle2') }}
        </h4>
        <p class="slogan-text__content">
          {{ $t('slogan2') }}
        </p>
      </div>
    </section>
    <section class="slogan__right" ref="slogan__right">
      <img src="images/phone1.png" alt="" class="slogan__item right1" />

      <div class="slogan-text slogan__item right2">
        <h4 class="slogan-text__title">
          {{ $t('sloganTitle3') }}
        </h4>
        <p class="slogan-text__content">
          {{ $t('slogan3') }}
        </p>
      </div>
      <img src="images/phone2.png" alt="" class="slogan__item right3" />
    </section>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import anime from 'animejs/lib/anime.es.js';
import ScrollMagic from 'scrollmagic';

const slogan__left = ref();
const slogan__right = ref();
const controller = new ScrollMagic.Controller();
const timelinesL: anime.AnimeTimelineInstance[] = [];
const timelinesR: anime.AnimeTimelineInstance[] = [];
const scenes: ScrollMagic.Scene[] = [];

onMounted(() => {
  for (let i = 0; i < slogan__left.value.children.length; i++) {
    const timeline = anime.timeline();
    const anim = {
      targets: `.left${i + 1}`,
      translateX: [-50, 0],
      opacity: 1,
      elasticity: 0,
      autoplay: false,
      duration: i == 0 ? 250 : 500,
      easing: 'linear',
    };

    timeline.add(anim);
    if (i !== 0) timeline.pause();
    timelinesL.push(timeline);

    if (i !== 0) {
      const scene = new ScrollMagic.Scene({
        triggerElement: slogan__left.value.children[i],
        duration: 500,
        triggerHook: 1,
      })
        .addTo(controller)
        .on('progress', function (event: any) {
          if (event.progress > 0.21)
            timelinesL[i].seek(timelinesL[i].duration * event.progress);
          else timelinesL[i].seek(0);
        });
      scenes.push(scene);
    }
  }

  for (let i = 0; i < slogan__right.value.children.length; i++) {
    const timeline = anime.timeline();
    const anim = {
      targets: `.right${i + 1}`,
      translateX: [50, 0],
      opacity: 1,
      elasticity: 0,
      autoplay: false,
      duration: i == 0 ? 250 : 500,
      easing: 'linear',
    };

    timeline.add(anim);
    if (i !== 0) timeline.pause();
    timelinesR.push(timeline);

    if (i !== 0) {
      const scene = new ScrollMagic.Scene({
        triggerElement: slogan__right.value.children[i],
        duration: 500,
        triggerHook: 1,
      })
        .addTo(controller)
        .on('progress', function (event: any) {
          if (event.progress > 0.21)
            timelinesR[i].seek(timelinesR[i].duration * event.progress);
          else timelinesR[i].seek(0);
        });
      scenes.push(scene);
    }
  }
});
</script>

<style scoped lang="scss">
.slogan {
  display: flex;
  margin-top: calc(var(--factor) * 2.5);
  flex-wrap: nowrap;
}
.slogan--wrap {
  margin-top: var(--factor);
  flex-wrap: wrap;
}
.slogan > * {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.slogan__item {
  max-width: calc(var(--factor) * 20);
  margin-bottom: calc(var(--slogan-gap) * 1.2);
  opacity: 0;
}

.slogan__left {
  margin-top: calc(var(--slogan-gap) * 0.6);
}
.slogan__left > * {
  opacity: 0;
}

.slogan-text {
  position: relative;
}

.slogan-text__title {
  margin-bottom: 1.5rem;
  line-height: 2.5rem;
  color: $header;
}
.slogan-text-content {
  line-height: 1.5rem;
}
</style>
