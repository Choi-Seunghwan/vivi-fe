<template>
  <div class="room-viewer">
    <div class="room-info-wrap"></div>
    <div class="viewer-wrap">
      <div v-show="hasLocalStream" class="member-item me" :class="{ 'max-member': isMaxMember }">
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
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import eventManager from '@/modules/EventManager';
import { EVENT_ON_TRACK } from '@/constant';
import VideoPlayer from '@/components/video/VideoPlayer.vue';
import Avatar from '@/components/common/Avatar.vue';
import { MAX_ROOM_MEMBER_COUNT } from '@/vivi-utils/constants';

export default {
  components: { VideoPlayer, Avatar },
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
    },
    isMaxMember() {
      return this.members?.length === MAX_ROOM_MEMBER_COUNT;
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
  }
};
</script>

<style lang="scss">
.room-viewer {
  width: 100%;
  height: 100%;
  border-radius: 12px;

  .viewer-wrap {
    display: flex;
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
    gap: 8px;

    .member-item {
      position: relative;
      flex: 1;
      flex-basis: 300px;

      .video {
        max-height: 300px;
      }
      &.me {
        flex-basis: 100%;
        .video {
          max-height: unset;
        }
        &.max-member {
          flex-basis: 300px;
        }
      }

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
