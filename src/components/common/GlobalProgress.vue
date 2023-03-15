<template>
  <div class="global-progress">
    <Progress class="progress" :width="5" :size="100" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import Progress from './Progress.vue';

export default defineComponent({
  name: 'GlobalProgress',
  components: {
    Progress
  },
  props: {
    indeterminate: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const indeterminate = props.indeterminate;
    return { indeterminate };
  }
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/base.scss';

.global-progress {
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  z-index: $z-index-global-progress;
  background: rgba(#111, 0.4);

  .progress {
    margin: auto;
  }
}
</style>
