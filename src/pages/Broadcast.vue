<template>
  <Layout class="broadcast">
    <section class="viewer-wrap">
      <RoomViewer ref="roomViewer" :roomInfo="room" :localStream="localStream"></RoomViewer>
    </section>
    <section class="chat-wrap">
      <ChatContainer />
    </section>
    <section class="controller-wrap">
      <BroadcastController @createRoom="createRoom" />
    </section>
  </Layout>
</template>

<script>
import mediaManager from '@/modules/MediaManager';
import { mapActions, mapState } from 'vuex';
import BroadcastController from '@/components/broadcast/BroadcastController.vue';
import RoomViewer from '@/components/roomViewer/RoomViewer.vue';
import ChatContainer from '@/components/chat/ChatContainer.vue';
import Layout from '@/components/layout/Layout.vue';

export default {
  components: {
    Layout,
    BroadcastController,
    RoomViewer,
    ChatContainer
  },
  data: () => ({
    localStream: null
  }),
  computed: {
    ...mapState('room', ['room'])
  },
  methods: {
    async createRoom(roomInfo) {
      await this._service.createRoom(roomInfo);
    }
  },
  async mounted() {
    await mediaManager.initLocalStream();
    this.localStream = mediaManager.getLocalStream();
  }
};
</script>

<style lang="scss" scoped>
.broadcast {
  display: flex;
  flex-wrap: wrap;
  column-gap: 12px;
  padding-top: 40px;

  .viewer-wrap {
    // width: 300px;
  }

  .chat-wrap {
    // width: 400px;
  }

  .controller-wrap {
    width: calc(100% - 8px);
  }
}
</style>
