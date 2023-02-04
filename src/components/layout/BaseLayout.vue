<template>
  <section :class="THEME" class="base-layout">
    <Dimmed />
    <NavContainer class="nav-container" />
    <SideNav />
    <div class="content">
      <slot></slot>
    </div>
  </section>
</template>
<script lang="ts">
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import NavContainer from '@/components/navigator/NavContainer.vue';
import SideNav from '@/components/navigator/SideNav.vue';
import Dimmed from './Dimmed.vue';

export default {
  name: 'BaseLayout',
  components: {
    NavContainer,
    SideNav,
    Dimmed
  },
  setup() {
    const store = useStore();
    const THEME = 'default';
    const router = useRouter();

    const showTopNav = computed(() => store.getters['context/showTopNav']);

    const backBtnHandler = () => {
      router.back();
    };

    return {
      THEME,
      showTopNav,
      backBtnHandler
    };
  }
};
</script>

<style lang="scss" scoped>
.base-layout {
  position: relative;
  width: 100%;
  height: 100%;
  .nav-container {
    position: absolute;
    top: 0px;
    width: 100%;
    height: 56px;
    z-index: 1;
  }
  .content {
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;
    overflow: auto;
    z-index: 0;
  }
}
</style>
