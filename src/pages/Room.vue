<template>
  <Ladyout class="room">
    <section class="room-viewer">
      <RoomViewerContainer :isHost="isHost" ref="RoomViewerContainer" />
    </section>
    <div v-show="isShowSetting" class="modal">
      <BroadcastController />
    </div>
  </Ladyout>
</template>
<script lang="ts">
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { computed, defineComponent, inject, onMounted, onUnmounted, watch } from '@vue/runtime-core';

import RoomViewerContainer from '@/components/room/RoomViewerContainer.vue';
import ChatContainer from '@/components/chat/ChatContainer.vue';
import type MessageManager from '@/service/MessageManager';
import PageLayout from '@/components/layout/PageLayout.vue';

export default defineComponent({
  components: {
    RoomViewerContainer,
    ChatContainer,
    PageLayout
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const isShowSetting = computed(() => store.getters['room/isShowSettingPanel']);
    const messageManager: MessageManager = inject('$message')!;
    const roomMessageHandler = messageManager.roomMessageHandler;
    const roomId = route.params?.roomId || '';
    const isHost = route.query?.isHost ? Boolean(route.query?.isHost) : false;
    const room = computed(() => store.getters['room/getRoom']);

    // const sws = messageManage.getServiceWebSocket();
    // const pc = new PeerConnection({ localStream, member: null, socket: sws });

    const joinRoom = async () => {
      await roomMessageHandler.joinRoom(roomId);
    };

    const ackJoinRoom = async () => {};

    const leaveRoom = async () => {
      await roomMessageHandler.leaveRoom();
    };

    watch(room, (newVal, prevVal) => {
      if (!!prevVal && !newVal) leaveRoom();
    });

    onMounted(async () => {
      roomMessageHandler.setAckHandler(roomMessageHandler.ackJoinRoom.name, ackJoinRoom.bind(this));

      if (!room) await joinRoom();
    });

    onUnmounted(() => {
      roomMessageHandler.releaseAckHandler(roomMessageHandler.ackJoinRoom.name);
      store.dispatch('room/clearRoom');
      store.dispatch('chat/clearChatMessages');
    });

    return {
      isShowSetting,
      isHost
    };
  }
});
</script>

<style lang="scss" scoped>
.room {
  .room-viewer-wrap {
    width: 300px;
  }

  .modal {
    position: absolute;
    width: 96%;
    height: 200px;
    top: 58px;
    right: 12px;
    background-color: rgba(#000, 0.7);
    border: solid 1px #fff;
    border-radius: 6px;
    box-sizing: border-box;
    padding: 14px;
    z-index: 100;
  }
}
</style>
