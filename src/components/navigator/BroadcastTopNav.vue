<template>
  <nav class="broadcast-top-nav">
    <button @click="backBtnHandler" class="back-btn">
      <Arrow :width="24" :height="24" />
    </button>

    <!-- <BasicButton v-show="true" @click="settingBtnHandler" class="setting-btn">
      {{ parseStr('SETTING') }}
    </BasicButton> -->
  </nav>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { parseStr } from '@/utils';
import { useStore } from 'vuex';

import Arrow from '../svg/Arrow.vue';
import BasicButton from '../common/BasicButton.vue';

export default {
  components: {
    Arrow,
    BasicButton
  },
  name: 'BroadcastTopNav',
  setup() {
    const router = useRouter();
    const store = useStore();

    const backBtnHandler = () => {
      router.push({ name: 'Home' });
    };

    return { parseStr, backBtnHandler };
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
  cursor: pointer;
}
</style>
