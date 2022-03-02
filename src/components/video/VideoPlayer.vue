<template>
  <div class="video-player">
    <video class="video" ref="videoEl" autoplay></video>
  </div>
</template>
<script>
export default {
  name: 'videoPlayer',
  watch: {
    media(m) {
      this.$refs.videoEl.srcObject = m;
    }
  },
  props: {
    media: {
      default: null
    }
  },
  methods: {
    getVideoEl() {
      return this.$refs?.videoEl;
    }
  }
};
</script>
<style lang="scss" scoped>
.video-player {
  .video {
    width: 100%;
  }
}
</style>
