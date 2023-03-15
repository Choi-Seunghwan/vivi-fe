<template>
  <div class="page-layout">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'PageLayout'
};
</script>

<style lang="scss" scoped>
.page-layout {
  padding: 0 20px 40px 20px;
  width: 100%;
  height: 100%;
}
</style>
