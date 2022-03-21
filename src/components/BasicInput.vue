<template>
  <div :class="{ focus: focus }" class="basic-input-wrap">
    <input
      class="bg-transparent focus:text-[#fff]"
      ref="input"
      :value="_value"
      :maxlength="maxLength"
      @input="inputHandler"
      @focus="focus = true"
      @blur="focus = false"
      @keyup.enter="keyEnter"
    />
    <button v-if="focus" class="ml-[12px]" @click="$emit('confirm', v)">
      <img class="w-[14px]" src="/images/check-icon-white.svg" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'BasicInput',
  props: {
    modelValue: { type: String, default: '' },
    maxLength: { type: Number, default: null },
    useConfirm: { type: Boolean, default: false }
  },

  data: () => ({
    focus: false,
    v: ''
  }),
  computed: {
    _value: {
      get() {
        return this.modelValue;
      },
      set(v) {
        this.v = v;
        this.$emit('update:modelValue', this.v);
      }
    }
  },
  methods: {
    keyEnter(e) {
      this.v = e.target.value;
      this.$emit('update:modelValue', this.v);
      this.$emit('confirm', this.v);
      this.$refs.input?.blur();
      this.focus = false;
    },
    inputHandler(e) {
      this.v = e.target.value;
    }
  }
};
</script>

<style lang="scss" scoped>
.basic-input-wrap {
  &.focus {
    border-bottom: 1px solid #fff;
  }
  > input {
    width: calc(100% - 40px);
  }
}
</style>
