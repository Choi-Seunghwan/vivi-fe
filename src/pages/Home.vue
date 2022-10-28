<template>
  <div class="home">
    <div class="live-chat">
      <h1 class="title">최신 라이브</h1>
      <RoomListContainer />
    </div>
  </div>
</template>
<script lang="ts">
import RoomListContainer from '@/components/room/RoomListContainer.vue';
import { defineComponent } from 'vue'


export default defineComponent( {
  name: 'Home',
  components: {
    RoomListContainer
  },
  data: () => ({}),
  methods: {},
  mounted() {}
});
</script>
<style lang="scss" scoped>
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
