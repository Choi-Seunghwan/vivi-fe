<template>
  <div class="screen">
    <video class="video" ref="videoRef" autoplay />
  </div>
</template>

<script lang="ts">
import { computed, ref, watch } from '@vue/runtime-core';
export default {
  name: 'Screen',
  props: {
    stream: { type: Object as any, default: null, required: false }
  },
  setup(props, context) {
    const videoRef = ref();
    const stream = computed(() => props.stream);

    watch(
      stream,
      (newVal, prevVal) => {
        if (newVal && videoRef?.value) videoRef.value.srcObject = newVal;
      },
      { immediate: true }
    );
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

  .video {
    width: 100%;
    height: 100%;
  }
}
</style>
