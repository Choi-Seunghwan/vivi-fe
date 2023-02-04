<template>
  <section :class="THEME" class="base-layout">
    <Dimmed />
    <NavContainer class="top-nav" :class="{ hide: !showTopNav }" />
    <button class="back-btn" @click="backBtnHandler" :class="{ hide: !showBackBtn }">
      <Arrow :width="40" :height="40" />
    </button>
    <SideNav />
    <div class="content">
      <slot></slot>
    </div>
  </section>
</template>
<script lang="ts">
import { computed, inject } from '@vue/runtime-core';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import NavContainer from '@/components/navigator/NavContainer.vue';
import SideNav from '@/components/navigator/SideNav.vue';
import Dimmed from './Dimmed.vue';
import Arrow from '../svg/Arrow.vue';

export default {
  name: 'BaseLayout',
  components: {
    NavContainer,
    SideNav,
    Dimmed,
    Arrow
  },
  setup() {
    const store = useStore();
    const THEME = 'default';
    const router = useRouter();

    const showTopNav = computed(() => store.getters['context/showTopNav']);
    const showBackBtn = computed(() => {
      if (!showTopNav.value) return true;
      else return false;
    });

    const backBtnHandler = () => {
      router.back();
    };

    return {
      THEME,
      showTopNav,
      backBtnHandler,
      showBackBtn
    };
  }
};
</script>

<style lang="scss" scoped>
.base-layout {
  position: relative;
  width: 100%;
  height: 100%;

  .content {
    position: absolute;
    width: 100%;
    height: calc(100% - 56px);
    top: 56px;
    overflow: auto;
  }

  .top-nav {
    position: absolute;
    top: 0;
    transition: all ease 0.8s;

    &.hide {
      pointer-events: none;
      top: -56px;
    }
  }

  .back-btn {
    position: absolute;
    top: 6px;
    left: 12px;
    padding: 0;
    margin: 0;
    cursor: pointer;
    transition: all ease 0.8s;

    &.hide {
      pointer-events: none;
      top: -100px;
    }
  }
}
</style>
