<template>
  <div class="room-list-container">
    <div class="room-list">
      <RoomCard
        v-for="(roomItem, roomListIndex) in roomList"
        :key="roomListIndex"
        @click="roomCardHandler(roomItem)"
        :title="roomItem.title"
        :memberCount="roomItem.memberCount"
        class="room-list__item"
      />
    </div>
  </div>
</template>
<script>
import RoomCard from './RoomCard.vue';

export default {
  components: {
    RoomCard
  },
  data: () => ({
    loading: true,
    roomList: []
  }),
  methods: {
    roomCardHandler(roomItem) {
      const { roomId } = roomItem;
      this.$router.push({ name: 'room', params: { roomId } });
    },
    async init() {
      const result = await this._service.getRoomList();
      this.roomList = result?.roomList;
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
  .roomList {
    display: flex;
    flex-wrap: wrap;

    &__item {
      width: 400px;
    }
  }
}
</style>
