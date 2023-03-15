<template>
  <v-progress-circular :width="width" :indeterminate="indeterminate" :size="size" />
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  name: 'Progress',
  props: {
    indeterminate: {
      type: Boolean,
      default: true
    },
    width: {
      type: Number,
      default: 7
    },
    size: {
      type: Number,
      default: 20
    }
  },
  setup(props) {
    const indeterminate = props.indeterminate;
    const width = props.width;
    const size = props.size;

    return { indeterminate, width, size };
  }
});
</script>

<style lang="scss" scoped></style>
