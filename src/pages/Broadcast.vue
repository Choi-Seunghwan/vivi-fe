<template>
  <Layout class="broadcast">
    <section class="room-viewer-wrap">
      <RoomViewer
        ref="roomViewer"
        :room="room"
        :members="members"
        :accountInfo="accountInfo"
        :localStream="localStream"
      ></RoomViewer>
    </section>
    <section class="tab-wrap">
      <div class="tab">
        <button
          @click="tabItemHandler('member')"
          :disabled="!isOnAir"
          :class="{ disabled: !isOnAir, active: tab === 'member' }"
          class="tab-item"
        >
          <img src="images/user-icon.png" />
        </button>
        <button @click="tabItemHandler('controller')" :class="{ active: tab === 'controller' }" class="tab-item">
          <img src="images/cogwheel-icon.png" />
        </button>
      </div>
      <div class="tab-content">
        <MemberList v-show="tab === 'member'" :members="members" />
        <BroadcastController v-show="tab === 'controller'" @createRoom="createRoomHandler" />
      </div>
    </section>
  </Layout>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import mediaManager from '@/modules/MediaManager';
import BroadcastController from '@/components/broadcast/BroadcastController.vue';
import RoomViewer from '@/components/RoomViewer.vue';
import ChatContainer from '@/components/chat/ChatContainer.vue';
import Layout from '@/components/layout/Layout.vue';
import MemberList from '@/components/room/MemberList.vue';

export default {
  name: 'Broadcast',
  components: {
    Layout,
    BroadcastController,
    RoomViewer,
    ChatContainer,
    MemberList
  },
  data: () => ({
    localStream: null,
    /**
     * tab: 'controller' 방송 설정, member: 참여 맴버
     */
    tab: 'controller',
    isOnAir: false
  }),
  computed: {
    ...mapState('room', ['room']),
    ...mapGetters('auth', ['accountInfo']),
    members() {
      if (this.room?.members?.length) {
        return this.room?.members.filter(m => m?.nickname !== this.accountInfo?.nickname);
      } else return [];
    }
  },
  methods: {
    async createRoom(roomInfo) {
      await this._service.createRoom(roomInfo);
    },
    async createRoomHandler(roomInfo) {
      await this.createRoom(roomInfo);
      this.isOnAir = true;
      this.tab = 'member';
    },
    tabItemHandler(itemKey) {
      this.tab = itemKey;
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
        background: #aaa;

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

        &.active {
          background: #eee;
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
