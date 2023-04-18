<template>
  <div class="room-viewer-container">
    <div class="room-info"></div>
    <div class="viewer">
      <Screen :stream="stream" class="screen" />
      <ChatContainer class="chat-container" />
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { parseStr } from '@/utils';

import Screen from '@/components/screen/Screen.vue';
import BasicButton from '@/components/common/BasicButton.vue';
import ChatContainer from '@/components/chat/ChatContainer.vue';

export default {
  name: 'RoomViewerContainer',
  components: { Screen, BasicButton, ChatContainer },
  props: {
    isHost: { type: Boolean, default: false },
    stream: { type: Object, default: null }
  },
  setup(props, context) {
    const isHost = props.isHost;
    const stream = props.stream;

    onMounted(async () => {});

    onUnmounted(() => {});

    return {
      parseStr,
      isHost,
      stream
    };
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/base';

.room-viewer-container {
  width: 100%;
  height: 100%;
  background-color: rgba(#111, 1);

  .viewer {
    display: flex;
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
    gap: 8px;
    background: #111;
  }

  .room-info {
    position: absolute;
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 100%;
    height: 56px;
    z-index: 3;
    top: 0;
    left: 0;
    background: rgba(#000, 0.2);

    .setting-btn {
      margin-left: auto;
      margin-right: 12px;
    }
  }

  .chat-container {
    width: 100%;
    height: 100%;
    padding-top: 432px;
  }

  .screen {
    position: fixed;
    left: 50%;
    right: 50%;
    top: 0;
    transform: translateX(-50%);
    width: 768px;
    height: 432px;
    z-index: 1;

    @include tm {
      width: 768px;
      height: 432px;
    }
  }
}
</style>
