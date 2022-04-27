<template>
  <div :class="{ focus, underline, 'confirm-type': useConfirm }" class="basic-input-wrap">
    <input
      ref="input"
      :value="_value"
      :maxlength="maxLength"
      @input="inputHandler"
      @focus="focus = true"
      @blur="focus = false"
      @keyup.enter="keyEnter"
    />
    <button v-if="useConfirm && focus" class="" @click="$emit('confirm', v)">
      <img src="/images/check-icon-white.svg" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'BasicInput',
  props: {
    modelValue: { type: String, default: '' },
    maxLength: { type: Number, default: null },
    useConfirm: { type: Boolean, default: false },
    underline: { type: Boolean, default: false }
  },

  data: () => ({
    focus: false
  }),
  computed: {
    _value: {
      get() {
        return this.modelValue;
      },
      set(v) {
        this.$emit('update:modelValue', v);
      }
    }
  },
  methods: {
    keyEnter(e) {
      this.v = e.target.value;
      this.$emit('confirm', this.value);
      this.$refs.input?.blur();
      this.focus = false;
    },
    inputHandler(e) {
      this._value = e.target.value;
    }
  }
};
</script>

<style lang="scss" scoped>
.basic-input-wrap {
  &.focus {
    border-bottom: 1px solid #fff;
  }

  &.underline {
    border-bottom: 1px solid #fff;
  }

  > input {
    width: 100%;
    color: #fff;
    background-color: transparent;
    border: unset;
    padding-left: 4px;
    padding-bottom: 4px;
    font-size: 14px;
    line-height: 20px;
    &:focus {
      color: #fff;
    }
  }
  > button {
    > img {
      width: 14px;
    }
  }

  &.confirm-type {
    > input {
      width: calc(100% - 40px);
    }
  }
}
</style>
