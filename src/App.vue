<template>
  <v-app>
    <div ref="app" class="app">
      <AdSection ad-section></AdSection>
      <BaseLayout class="main-section">
        <router-view />
      </BaseLayout>
      <section sub-section></section>

      <Toast ref="toast" />
    </div>
  </v-app>
</template>

<script lang="ts">
import { inject } from 'vue';
import _remove from 'lodash/remove';
import BaseLayout from '@/components/layout/BaseLayout.vue';
import AdSection from './components/layout/AdvSection.vue';
import Toast from '@/components/common/Toast.vue';
import { toast } from '@/utils/index';
import type ServiceManager from './service/ServiceManager';

export default {
  name: 'App',
  components: { BaseLayout, AdSection, Toast },
  setup() {
    const services: ServiceManager = inject('$service')!;

    return {
      services
    };
  },
  mounted() {
    this.$nextTick(() => {
      const toastNode = this.$refs.toast;
      toast.setToastNode(toastNode);
    });
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/base.scss';

.app {
  display: flex;
  width: 100%;
  height: 100%;
}

[ad-section] {
  flex: 1;
  width: 100%;
  height: 100%;
}

[sub-section] {
  flex: 1;
  max-width: 160px;
  height: 100%;
}
.main-section {
  max-width: $breakpoint-tablet;
  background: #111;
  overflow-y: auto;
}
</style>
