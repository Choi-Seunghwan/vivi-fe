<template>
  <div class="room-list-container">
    <div v-if="hasRoomList" class="room-list">
      <RoomCard
        v-for="roomItem in roomList"
        :key="roomItem.roomId"
        @click="roomCardHandler(roomItem)"
        :title="roomItem.title"
        :memberCount="roomItem.memberCount"
        class="room-list__item"
      />
    </div>
    <div class="no-room" v-else>
      <p>지금은 이 주제의 라이브 방이 없습니다</p>
      <p>내가 먼저 라이브 방을 만들어 볼까요?</p>
    </div>
  </div>
</template>
<script>
import RoomCard from './RoomCard.vue';

export default {
  components: {
    RoomCard
  },
  props: {
    tag: { type: String, default: '' }
  },
  data: () => ({
    loading: true,
    roomList: []
  }),
  computed: {
    hasRoomList() {
      return !!this.roomList?.length;
    }
  },
  methods: {
    roomCardHandler(roomItem) {
      const { roomId } = roomItem;
      this.$router.push({ name: 'room', params: { roomId } });
    },
    async init() {
      const tag = this.tag;
      this.roomList = await this._service.getRoomList({ tag });
      this.loading = false;
    }
  },
  async beforeMount() {
    this.init();
  }
};
</script>
<style lang="scss">
.room-list-container {
  display: flex;
  min-height: 100px;
  justify-content: center;
  align-items: center;

  .roomList {
    display: flex;
    flex-wrap: wrap;

    &__item {
      width: 400px;
    }
  }

  .no-room {
    text-align: center;
    p {
      font-size: 18px;
    }
  }
}
</style>
