<template>
  <nav class="broadcast-top-nav">
    <button @click="backBtnHandler" class="back-btn">
      <Arrow :width="40" :height="40" />
    </button>

    <BasicButton v-show="isBroadcastHost" @click="settingBtnHandler" class="setting-btn">
      {{ parseStr('SETTING') }}
    </BasicButton>
  </nav>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { parseStr } from '@/utils';

import Arrow from '../svg/Arrow.vue';
import { computed } from '@vue/runtime-core';
import BasicButton from '../common/BasicButton.vue';

export default {
  components: {
    Arrow,
    BasicButton
  },
  name: 'BroadcastTopNav',
  setup() {
    const router = useRouter();

    const backBtnHandler = () => {
      router.back();
    };

    const isBroadcastHost = computed(() => {
      return true;
    });

    const settingBtnHandler = () => {};

    return { parseStr, backBtnHandler, isBroadcastHost, settingBtnHandler };
  }
};
</script>

<style lang="scss" scoped>
.broadcast-top-nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.back-btn {
  padding: 0;
  cursor: pointer;
}
</style>
