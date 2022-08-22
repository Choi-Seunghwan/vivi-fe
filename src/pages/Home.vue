<template>
  <div class="home">
    <!-- <Banner></Banner> -->
    <div class="live-chat">
      <h1 class="title">최신 라이브</h1>
      <RoomListContainer />
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
  data: () => ({}),
  methods: {},
  mounted() {}
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
      margin-bottom: 8px;
    }
  }
}
</style>
