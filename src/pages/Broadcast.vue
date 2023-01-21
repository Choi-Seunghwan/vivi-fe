<template>
  <Layout class="broadcast">
    <section class="room-viewer">
      <RoomViewerContainer @toggleSetting="toggleSetting" :isHost="true" ref="roomViewer"></RoomViewerContainer>
    </section>
    <div v-show="isShowSetting" class="modal">
      <BroadcastController />
    </div>
  </Layout>
</template>

<script lang="ts">
import BroadcastController from '@/components/broadcast/BroadcastController.vue';
import RoomViewerContainer from '@/components/room/RoomViewerContainer.vue';
import ChatContainer from '@/components/chat/ChatContainer.vue';
import Layout from '@/components/layout/Layout.vue';
import MemberList from '@/components/room/MemberList.vue';
import { ref } from 'vue';

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
    const isShowSetting = ref(true);

    const toggleSetting = (v = undefined) => {
      if (v !== undefined) isShowSetting.value = v;
      else isShowSetting.value = !isShowSetting.value;
    };

    return { isShowSetting, toggleSetting };
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
    border-bottom: #eee 2px solid;
  }

  .modal {
    position: absolute;
    width: 300px;
    height: 200px;
    top: 58px;
    right: 12px;
    background-color: rgba(#000, 0.7);
    border: solid 1px #fff;
    border-radius: 6px;
    box-sizing: border-box;
    padding: 14px;
  }
}
</style>
