<template>
  <Layout class="broadcast">
    <section class="room-viewer-wrap">
      <!-- <div v-show="showBlur" class="blur"></div> -->
      <RoomViewer ref="roomViewer" :room="room" :members="members" :userInfo="userInfo"></RoomViewer>
    </section>
    <section v-show="showTab" class="tab-wrap">
      <div class="tab-content">
        <MemberList :members="members" />
        <BroadcastController />
      </div>
    </section>
  </Layout>
</template>

<script lang="ts">
import { mapState, mapGetters } from 'vuex';
import mediaManager from '@/modules/MediaManager';
import BroadcastController from '@/components/broadcast/BroadcastController.vue';
import RoomViewer from '@/components/room/RoomViewer.vue';
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
  setup() {},
  data: () => ({
    showTab: true,
    isOnAir: false
  }),
  computed: {
    ...mapState('room', ['room']),
    ...mapGetters('auth', ['userInfo']),
    members() {
      if (this.room?.members?.length) {
        return this.room?.members.filter(m => m?.nickname !== this.userInfo?.nickname);
      } else return [];
    },
    showBlur() {
      return this.showTab;
    }
  },
  methods: {},
  async mounted() {},
  beforeUnmount() {}
};
</script>

<style lang="scss" scoped>
.broadcast {
  position: relative;
  column-gap: 12px;
  padding: 0;

  .room-viewer-wrap {
    position: relative;
    width: 100%;
    height: 60%;
    flex: 1;
    border-bottom: #eee 2px solid;
  }

  .tab-wrap {
    width: 100%;
    height: 40%;
    border-top: 2px;
    border-color: #eee;
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
