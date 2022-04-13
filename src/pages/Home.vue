<template>
  <div class="home">
    <!-- <Banner></Banner> -->
    <div class="live-chat">
      <h1 class="title">최신 라이브</h1>
      <div class="list-wrap">
        <h2 class="title">소통 💬</h2>
        <RoomListContainer tag="CHAT" />
      </div>
      <div class="list-wrap">
        <h2 class="title">노래 🎤🎶</h2>
        <RoomListContainer tag="SONG" />
      </div>
      <div class="list-wrap">
        <h2 class="title">소개팅 🥰</h2>
        <RoomListContainer tag="DATE" />
      </div>
    </div>
  </div>
</template>
<script>
import Banner from '@/components/common/Banner.vue';
import RoomListContainer from '@/components/room/RoomListContainer.vue';

export default {
  name: 'Home',
  components: {
    Banner,
    RoomListContainer
  },
  data: () => ({
    roomList: []
  }),
  methods: {
    async getRoomList() {
      this.roomList = await this._service.getRoomList();
    }
  },
  mounted() {
    this.getRoomList();
  }
};
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
    }
  }
}
</style>
