<template>
  <Layout class="broadcast">
    <section class="room-viewer-wrap">
      <RoomViewer ref="roomViewer" :localStream="localStream"></RoomViewer>
    </section>
    <section class="tab-wrap">
      <div class="tab">
        <button :class="{ disabled: !isOnAir }" class="tab-item">
          <img src="images/user-icon.png" />
        </button>
        <button class="tab-item">
          <img src="images/cogwheel-icon.png" />
        </button>
      </div>
      <div class="tab-content">
        <BroadcastController v-show="tab === 'controller'" @createRoom="createRoom" />
      </div>
    </section>
  </Layout>
</template>

<script>
import mediaManager from '@/modules/MediaManager';
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
    localStream: null,
    /**
     * tab: 'controller' 방송 설정, members: 참여 맴버
     */
    tab: 'controller',
    isOnAir: false
  }),
  methods: {
    async createRoom(roomInfo) {
      await this._service.createRoom(roomInfo);
      this.isOnAir = true;
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

  .room-viewer-wrap {
    flex: 1;
    border-radius: 6px;
  }

  .tab-wrap {
    width: 400px;
    height: 100%;
    background: #000;
    border-radius: 6px;
    overflow: hidden;

    .tab {
      display: flex;
      width: 100%;
      height: 40px;
      background: #eee;

      .tab-item {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border-left: solid 1px #000;
        background: #eee;

        &:hover {
          background: #aaa;
        }

        &.disabled {
          background: #aaa;
          cursor: not-allowed;
        }

        &:nth-of-type(1) {
          border: none;
        }

        > img {
          width: 32px;
          height: 32px;
        }
      }
    }

    .tab-content {
      display: flex;
      width: 100%;
      height: calc(100% - 40px);
      padding: 20px;
    }
  }
}
</style>
