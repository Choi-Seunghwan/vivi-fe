<template>
  <Layout class="broadcast">
    <section class="room-viewer">
      <RoomViewerContainer :isHost="true" ref="roomViewer"></RoomViewerContainer>
    </section>
    <div v-show="isShowSetting" class="modal">
      <BroadcastController />
    </div>
  </Layout>
</template>

<script lang="ts">
import { computed, inject, onUnmounted } from 'vue';
import { useStore } from 'vuex';

import BroadcastController from '@/components/broadcast/BroadcastController.vue';
import RoomViewerContainer from '@/components/room/RoomViewerContainer.vue';
import ChatContainer from '@/components/chat/ChatContainer.vue';
import Layout from '@/components/layout/Layout.vue';
import MemberList from '@/components/room/MemberList.vue';
import type MessageManager from '@/service/MessageManager';

export default {
  name: 'Broadcast',
  components: {
    Layout,
    BroadcastController,
    RoomViewerContainer,
    ChatContainer,
    MemberList
  },
  setup() {
    const store = useStore();
    const isShowSetting = computed(() => store.getters['room/isShowSettingPanel']);
    const messageManager: MessageManager = inject('$message')!;
    const roomMessageHandler = messageManager.roomMessageHandler;

    onUnmounted(() => {
      store.dispatch('room/clearRoom');
      store.dispatch('chat/clearChatMessages');
    });

    return { isShowSetting };
  }
};
</script>

<style lang="scss" scoped>
.broadcast {
  position: relative;
  column-gap: 12px;
  padding: 0;

  .room-viewer {
    position: relative;
    width: 100%;
    height: 100%;
    flex: 1;
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
