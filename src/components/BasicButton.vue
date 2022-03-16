<template>
  <button :class="[theme]" class="basic-button"><slot></slot></button>
</template>

<script>
export default {
  name: 'BasicButton',
  props: {
    theme: {
      default: '',
      type: String
    }
  }
};
</script>

<style lang="scss" scoped>
.basic-button {
  padding: 0 8px;
  color: #fff;
  border: solid 1px #fff;
  border-radius: 4px;
  cursor: pointer;

  &.white {
    color: #000;
    background: #fff;
  }
}
</style>
