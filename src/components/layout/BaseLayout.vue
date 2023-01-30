<template>
  <section :class="theme" class="base-layout">
    <Dimmed />
    <NavContainer />
    <SideNav />
    <div class="content">
      <slot></slot>
    </div>
  </section>
</template>
<script lang="ts">
import { computed, inject } from '@vue/runtime-core';
import { useStore } from 'vuex';

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

    const showTopNav = computed(() => store.getters['context/showTopNav']);
  },
  data() {
    return {
      theme: 'default'
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.base-layout {
  width: 100%;
  height: 100%;

  .content {
    width: 100%;
    height: calc(100% - 56px);
  }
}
</style>
