<template>
  <div class="page-layout">
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PageLayout'
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/base.scss';

.page-layout {
  padding: 0 20px 40px 20px;
  padding-top: $top-nav-height;
  width: 100%;
  height: 100%;
}
</style>
