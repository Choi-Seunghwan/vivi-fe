<template>
  <div class="connection-dim">
    <p class="message">{{ parseStr('CONNECTION_DIM_MESSAGE') }}</p>
  </div>
</template>

<script lang="ts">
import { parseStr } from '@/utils';

export default {
  name: 'ConnectionDim',
  setup() {
    return {
      parseStr
    };
  }
};
</script>

<style lang="scss">
.connection-dim {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
  opacity: 0.3;
  z-index: 100;

  .message {
  }
}
</style>
