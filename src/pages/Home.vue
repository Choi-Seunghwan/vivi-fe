<template>
  <PageLayout class="home">
    <v-progress-circular indeterminate></v-progress-circular>
    <div class="live-chat">
      <h1 class="title">목록</h1>
      <RoomListContainer />
    </div>
  </PageLayout>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import RoomListContainer from '@/components/room/RoomListContainer.vue';
import PageLayout from '@/components/layout/PageLayout.vue';

export default defineComponent({
  name: 'Home',
  components: {
    PageLayout,
    RoomListContainer
  },
  data: () => ({}),
  methods: {},
  mounted() {}
});
</script>
<style lang="scss" scoped>
@import '@/assets/scss/base.scss';

.home {
  padding: 20px;

  .live-chat {
    > .title {
      font-size: 30px;
      font-weight: bold;
      margin: 30px 0;
    }
  }

  .list-wrap {
    padding: 30px 0;

    > .title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 8px;
    }
  }
}
</style>
