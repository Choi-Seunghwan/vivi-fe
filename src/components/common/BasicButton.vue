<template>
  <button
    :class="[theme, checked ? 'checked' : '', disabled ? 'disabled' : '']"
    class="basic-button"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BasicButton',
  props: {
    theme: {
      default: 'default',
      type: String
    },
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.basic-button {
  height: 32px;
  padding: 0 8px;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;

  &.default {
    border: #fff solid 1px;
    background: transparent;
    &:hover {
      background: rgba(#fff, 0.4);
    }
    &.checked {
      background: rgba(#fff, 0.8);
      border: rgba(#fff, 0.8) solid 1px;
      color: #191919;
      &hover {
        background: rgba(#fff, 0.8);
      }
    }
  }

  &.white {
    color: #000;
    background: #fff;
    &:hover {
      background: rgba(#fff, 0.6);
    }

    &.checked {
      &hover {
        background: #fff;
      }
    }
  }

  &.disabled {
    cursor: not-allowed;
    &:hover {
      background: unset;
    }
  }
}
</style>
