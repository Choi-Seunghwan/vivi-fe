<template>
  <div class="room-viewer">
    <VideoPlayer ref="videoPlayer" class="video-player" :media="localStream" />
    <div v-for="(member, i) in members" :key="i">
      <div>{{ member.nickname }}</div>
      <VideoPlayer :media="remoteStream"></VideoPlayer>
    </div>
  </div>
</template>
<script>
import VideoPlayer from '@/components/video/VideoPlayer.vue';
import eventManager from '@/modules/EventManager';
import { EVENT_ON_TRACK } from '@/constant';

export default {
  components: {
    VideoPlayer
  },
  props: {
    roomInfo: {
      default: () => ({}),
      type: Object
    },
    localStream: null
  },
  data: () => ({
    remoteStream: null
  }),
  computed: {
    members() {
      return this.roomInfo?.members;
    }
  },
  methods: {
    getRemoteStream(member) {
      return member?.peerConnection?.remoteStream;
    },
    remoteStreamHandler(arg) {
      const { context, remoteStream } = arg;
      this.remoteStream = remoteStream;
    }
  },
  mounted() {
    eventManager.setEvent(EVENT_ON_TRACK, this.remoteStreamHandler.bind(this));
  }
};
</script>

<style lang="scss" scoped>
.room-viewer {
  width: 100%;
  height: 100%;
}
</style>
