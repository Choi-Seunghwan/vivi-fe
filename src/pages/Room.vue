<template>
  <div class="room">
    <section class="room-viewer-wrap">
      <RoomViewerContainer ref="RoomViewerContainer"></RoomViewerContainer>
    </section>
  </div>
</template>
<script lang="ts">
import { useStore, mapState } from 'vuex';
import { useRoute } from 'vue-router';

import ChatContainer from '@/components/chat/ChatContainer.vue';
import type MessageManager from '@/service/MessageManager';
import { computed, inject, onMounted, onUnmounted, watch } from '@vue/runtime-core';

export default {
  components: {
    // RoomViewer,
    ChatContainer
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const messageManager: MessageManager = inject('$message')!;
    const roomMessageHandler = messageManager.roomMessageHandler;
    const roomId = route.params?.roomId || '';

    const joinRoom = async () => {
      await roomMessageHandler.joinRoom(roomId);
    };

    const leaveRoom = async () => {
      await roomMessageHandler.leaveRoom();
    };

    const room = computed(() => store.getters['room/getRoom']);

    watch(room, (newVal, prevVal) => {
      if (!!prevVal && !newVal) leaveRoom();
    });

    onMounted(async () => {
      await joinRoom();
    });

    onUnmounted(() => {
      store.dispatch('room/clearRoom');
      store.dispatch('chat/clearChatMessages');
    });
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
