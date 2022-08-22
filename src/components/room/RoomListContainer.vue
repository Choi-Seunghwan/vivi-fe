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
      this.$router.push({ name: 'Room', params: { roomId } });
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
  align-items: center;

  .room-list {
    display: flex;
    gap: 12px;
  }
}
</style>
