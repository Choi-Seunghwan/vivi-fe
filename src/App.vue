<template>
  <div class="app">
    <AdSection ad-section></AdSection>
    <BaseLayout class="main-section">
      <router-view />
    </BaseLayout>
    <section sub-section></section>
  </div>
</template>

<script>
import _remove from 'lodash/remove';
import BaseLayout from '@/layouts/BaseLayout.vue';
import AdSection from './components/layout/AdvSection.vue';

export default {
  name: 'App',
  components: { BaseLayout, AdSection },
  beforeMount() {
    this._service.setApp(this);
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
}
</style>
