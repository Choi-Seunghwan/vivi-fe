<template>
  <div :class="theme" class="base-layout">
    <Dimmed />
    <TopNav />
    <SideNav />
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import TopNav from "@/components/navigator/TopNav.vue";
import SideNav from "@/components/navigator/SideNav.vue";
import Dimmed from "../components/layout/Dimmed.vue";

export default {
  name: "BaseLayout",
  components: {
    TopNav,
    SideNav,
    Dimmed,
  },
  data() {
    return {
      theme: "default",
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss">
@import "@/assets/scss/base.scss";

.base-layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;

  .content {
    width: 100%;
    height: 100%;

    @include tablet {
      max-width: 1024px;
    }

    @include desktop {
      max-width: 1440px;
    }
  }
}
</style>
