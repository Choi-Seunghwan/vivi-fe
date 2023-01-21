<template>
  <div class="room">
    <section class="room-viewer-wrap">
      <RoomViewer ref="roomViewer" :roomInfo="room" />
    </section>
    <section class="chat-wrap">
      <ChatContainer />
    </section>
  </div>
</template>
<script>
import mediaManager from '@/modules/MediaManager';
import { mapState, mapActions } from 'vuex';
// import RoomViewer from '@/components/room/RoomViewer.vue';
import ChatContainer from '@/components/chat/ChatContainer.vue';
import { toast, parseStr } from '@/utils';

export default {
  components: {
    // RoomViewer,
    ChatContainer
  },
  watch: {
    room(v) {
      if (!v) {
        toast.showToast(parseStr('TOAST_HOST_OUT'));
        this.$router.push({ name: 'Home' });
      }
    },
    roomConnectionStatus(v, oldV) {
      if (v === 'COMPLETE') {
        this._service.sendSessionDescOfferToRoomAllMembers();
      }
    }
  },
  computed: {
    ...mapState('room', ['room', 'roomConnectionStatus']),
    roomId() {
      return Number(this.$route?.params?.roomId);
    }
  },
  async mounted() {
    const { roomId } = this;
    await mediaManager.initLocalStream();
    this._service.joinRoom({ roomId });
  },
  beforeUnmount() {
    this._service.leaveRoom();
  }
};
</script>

<style lang="scss" scoped>
.room {
  .room-viewer-wrap {
    width: 300px;
  }
}
</style>
