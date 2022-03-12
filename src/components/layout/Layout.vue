<template>
  <div class="layout">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'layout'
};
</script>

<style lang="scss" scoped>
.layout {
  padding: 0 20px 40px 20px;
  width: 100%;
  height: 100%;
}
</style>
