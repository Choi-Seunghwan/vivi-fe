<template>
  <PageLayout class="home">
    <div class="live-chat">
      <h1 class="title">{{ parseStr('LIST') }}</h1>
      <RoomListContainer />
    </div>

    <div class="archive-chat">
      <h1 class="title">{{ parseStr('ARCHIVE_LIST') }}</h1>
      <RoomListContainer isArchive />
    </div>
  </PageLayout>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import RoomListContainer from '@/components/room/RoomListContainer.vue';
import PageLayout from '@/components/layout/PageLayout.vue';
import { parseStr } from '@/utils';

export default defineComponent({
  name: 'Home',
  components: {
    PageLayout,
    RoomListContainer
  },
  setup() {
    return { parseStr };
  }
});
</script>
<style lang="scss" scoped>
@import '@/assets/scss/base.scss';

.home {
  padding: 20px;

  .live-chat {
    margin-top: 80px;
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
