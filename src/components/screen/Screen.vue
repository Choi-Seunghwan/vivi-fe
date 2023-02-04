<template>
  <div class="screen">
    <video class="videoRef" ref="videoRef" autoplay />
  </div>
</template>

<script lang="ts">
import { onMounted, ref, watch } from '@vue/runtime-core';
export default {
  name: 'Screen',
  props: {
    stream: {}
  },
  setup(props, context) {
    const videoRef = ref();

    watch(
      () => props.stream,
      (newVal, prevVal) => {
        if (newVal && videoRef?.value) videoRef.value.srcObject = newVal;
      }
    );

    onMounted(() => {});
    return { videoRef };
  }
};
</script>

<style lang="scss" scoped>
.screen {
  display: flex;
  width: 100%;
  height: 100%;
  background: #aaa;
  align-items: center;
}
</style>
