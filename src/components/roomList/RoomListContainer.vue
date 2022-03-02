<template>
  <div class="roomItemContainer">
    <div class="roomList">
      <RoomCard
        v-for="(roomItem, roomListIndex) in roomList"
        :key="roomListIndex"
        @click.native="roomCardClickHandler(roomItem)"
        :title="roomItem.title"
        :memberCount="roomItem.memberCount"
        class="roomList__room"
      />
    </div>
  </div>
</template>
<script>
import RoomCard from "./RoomCard.vue";

export default {
  components: {
    RoomCard,
  },
  data: () => ({
    loading: true,
    roomList: [],
  }),
  methods: {
    roomCardClickHandler(roomItem) {
      const { roomId } = roomItem;
      this.$router.push({ name: "room", params: { roomId } });
    },
    async init() {
      console.log("@@@", this._service);
      const result = await this._service.getRoomList();
      this.roomList = result?.roomList;
      this.loading = false;
    },
  },
  async beforeMount() {
    this.init();
  },
};
</script>
<style lang="scss">
.roomItemContainer {
  .roomList {
    display: flex;
    flex-wrap: wrap;

    &__room {
      flex-basis: 25%;

      @media (min-width: 520px) {
        flex-basis: 50%;
      }
      @media (min-width: 992px) {
        flex-basis: 25%;
      }
    }
  }
}
</style>
