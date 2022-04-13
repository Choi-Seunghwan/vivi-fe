<template>
  <div class="room-viewer">
    <div class="room-info-wrap"></div>
    <div class="viewer-wrap">
      <div v-show="hasLocalStream" class="member-item me">
        <div class="member-info">
          <Avatar></Avatar>
          <p class="nickname">
            {{ nickname }}
          </p>
        </div>
        <VideoPlayer ref="videoPlayer" class="video-player" :media="localStream" />
      </div>
      <div v-for="(member, i) in members" :key="i" class="member-item">
        <div class="member-info">
          <Avatar></Avatar>
          <p class="nickname">
            {{ member.nickname }}
          </p>
        </div>
        <VideoPlayer :media="getRemoteStream(member)"></VideoPlayer>
      </div>
    </div>
    <!-- <div class="room-chat">
      <ChatContainer v-if="hasRoom" />
    </div> -->
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import eventManager from '@/modules/EventManager';
import { EVENT_ON_TRACK } from '@/constant';
import VideoPlayer from '@/components/video/VideoPlayer.vue';
import Avatar from '@/components/common/Avatar.vue';
import ChatContainer from '@/components/chat/ChatContainer.vue';

export default {
  components: { VideoPlayer, Avatar, ChatContainer },
  props: {
    room: { default: () => ({}), type: Object },
    accountInfo: { default: () => ({}), type: Object },
    members: { default: () => [], type: Array },
    localStream: null
  },
  computed: {
    hasLocalStream() {
      return !!this.localStream;
    },
    hasRoom() {
      return !!this.room?.roomId;
    },
    nickname() {
      return this.accountInfo?.nickname || '';
    }
  },
  methods: {
    getRemoteStream(member) {
      return member?.peerConnection?.remoteStream;
    },
    remoteStreamHandler(arg) {
      const { peerConnection, remoteStream } = arg;
      this.remoteStream = remoteStream;
      this.$forceUpdate();
    }
  },
  mounted() {
    eventManager.setEvent(EVENT_ON_TRACK, this.remoteStreamHandler.bind(this));
  },
  beforeUnmount() {}
};
</script>

<style lang="scss" scoped>
.room-viewer {
  width: 100%;
  height: 100%;
  border-radius: 12px;

  .viewer-wrap {
    display: flex;
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
    background: #eee;
    gap: 8px;

    .member-item {
      position: relative;
      flex: 1;

      .member-info {
        display: flex;
        position: absolute;
        align-items: center;
        padding: 8px;

        .nickname {
          margin-left: 6px;
        }
      }
    }
  }
}
</style>
