<template>
  <div class="room">
    <section class="room-viewer-wrap">
      <RoomViewerContainer ref="RoomViewerContainer"></RoomViewerContainer>
    </section>
    <section class="chat-wrap">
      <!-- <ChatContainer /> -->
    </section>
  </div>
</template>
<script lang="ts">
import { mapState, mapActions } from 'vuex';
import ChatContainer from '@/components/chat/ChatContainer.vue';
import type MessageManager from '@/service/MessageManager';
import { inject, onMounted } from '@vue/runtime-core';
import { useRoute } from 'vue-router';

export default {
  components: {
    // RoomViewer,
    ChatContainer
  },
  setup() {
    const route = useRoute();
    const messageManager: MessageManager = inject('$message')!;
    const roomMessageHandler = messageManager.roomMessageHandler;
    const roomId = route.params?.roomId || '';

    const joinRoom = async () => {
      roomMessageHandler.joinRoom(roomId);
    };

    onMounted(async () => {
      await joinRoom();
    });
  },
  computed: {
    ...mapState('room', ['room', 'roomConnectionStatus'])
  },
  async mounted() {},
  beforeUnmount() {}
};
</script>

<style lang="scss" scoped>
.room {
  .room-viewer-wrap {
    width: 300px;
  }
}
</style>
