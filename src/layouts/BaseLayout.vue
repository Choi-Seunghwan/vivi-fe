<template>
  <section :class="theme" class="base-layout">
    <Dimmed />
    <TopNav />
    <SideNav />
    <div class="content">
      <slot></slot>
    </div>
  </section>
</template>
<script>
import TopNav from '@/components/navigator/TopNav.vue';
import SideNav from '@/components/navigator/SideNav.vue';
import Dimmed from '../components/layout/Dimmed.vue';

export default {
  name: 'BaseLayout',
  components: {
    TopNav,
    SideNav,
    Dimmed
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
    // padding: 20px 20px 0 20px;
  }
}
</style>
