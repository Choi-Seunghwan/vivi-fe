<template>
  <PageLayout class="room">
    <section class="room-viewer">
      <RoomViewerContainer :isHost="isHost" :stream="stream" ref="RoomViewerContainer" />
    </section>
  </PageLayout>
</template>
<script lang="ts">
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  onUnmounted,
  ref,
  watch,
  type ComputedRef,
  type Ref
} from '@vue/runtime-core';

import RoomViewerContainer from '@/components/room/RoomViewerContainer.vue';
import ChatContainer from '@/components/chat/ChatContainer.vue';
import type MessageManager from '@/service/MessageManager';
import PageLayout from '@/components/layout/PageLayout.vue';
import { mediaManager, MediaManager } from '@/modules/MediaManager';
import eventManager from '@/modules/EventManager';
import { EVENT_ON_TRACK } from '@/constant';
import type { OnTrackEvent } from '@/modules/PeerConnection';

export default defineComponent({
  components: {
    RoomViewerContainer,
    ChatContainer,
    PageLayout
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const isShowSetting = computed(() => store.getters['room/isShowSettingPanel']);
    const messageManager: MessageManager = inject('$message')!;
    const roomMessageHandler = messageManager.roomMessageHandler;
    const roomId = route.params?.roomId || '';
    const isHost: ComputedRef<boolean> = computed(() => store.getters['room/isHost']);
    const room: ComputedRef<Room> = computed(() => store.getters['room/getRoom']);
    const stream: Ref<MediaStream | null> = ref(null);

    const joinRoom = async () => {
      await roomMessageHandler.joinRoom(roomId);
    };

    const ackJoinRoom = async args => {
      if (!args?.result) router.push({ name: 'Home' });

      stream.value = null;
    };

    const leaveRoom = async () => {
      await roomMessageHandler.leaveRoom();
    };

    watch(room, (newVal, prevVal) => {
      if (!!prevVal && !newVal) leaveRoom();
    });

    const setRemoteStream = ({ peerconnection, remoteStream }: OnTrackEvent) => {
      if (remoteStream) stream.value = remoteStream;
    };

    onMounted(async () => {
      roomMessageHandler.setAckHandler(roomMessageHandler.ackJoinRoom.name, ackJoinRoom.bind(this));

      if (isHost.value)
        setTimeout(() => {
          stream.value = mediaManager.getLocalStream() as MediaStream;
        }, 100);
      if (!isHost.value && !room.value) {
        eventManager.setEvent(EVENT_ON_TRACK, setRemoteStream.bind(this));
        await joinRoom();
      }
    });

    onUnmounted(() => {
      roomMessageHandler.releaseAckHandler(roomMessageHandler.ackJoinRoom.name);
      eventManager.releaseEvent(EVENT_ON_TRACK);
      if (isHost.value) mediaManager.clearLocalStream();
      leaveRoom();
      store.dispatch('room/clearRoom');
      store.dispatch('chat/clearChatMessages');
    });

    return {
      isShowSetting,
      isHost,
      stream
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
