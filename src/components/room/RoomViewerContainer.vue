<template>
  <div class="room-viewer-container">
    <div class="room-info"></div>
    <div class="viewer">
      <Screen />
      <ChatContainer class="chat-container" />
    </div>
  </div>
</template>

<script lang="ts">
import { mapActions, mapState, mapGetters } from 'vuex';
import { parseStr } from '@/utils';
import Screen from '@/components/screen/Screen.vue';
import BasicButton from '@/components/common/BasicButton.vue';
import ChatContainer from '@/components/chat/ChatContainer.vue';

export default {
  name: 'RoomViewerContainer',
  components: { Screen, BasicButton, ChatContainer },
  props: {
    isHost: { type: Boolean, default: false }
  },
  setup(props, context) {
    const isHost = props.isHost;
    const settingBtnHandler = () => {
      context.emit('toggleSetting');
    };

    return {
      parseStr,
      isHost,
      settingBtnHandler
    };
  }
};
</script>

<style lang="scss">
.room-viewer-container {
  width: 100%;
  height: 100%;
  background-color: rgba(#fff, 1);
  background-color: #fff;

  .viewer {
    display: flex;
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
    gap: 8px;
    background: #ccc;
  }

  .room-info {
    position: absolute;
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 100%;
    height: 56px;
    z-index: 2;
    top: 0;
    left: 0;
    background: rgba(#000, 0.2);

    .setting-btn {
      margin-left: auto;
      margin-right: 12px;
    }
  }

  .chat-container {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
  }
}
</style>
