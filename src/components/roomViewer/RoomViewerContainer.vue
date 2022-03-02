<template>
  <div class="RoomViewerContainer">
    <RoomViewer />
    <!-- <ChatContainer>
      <template v-slot:background>
        <VideoContainer />
      </template>
    </ChatContainer> -->
  </div>
</template>

<script>
import ChatContainer from '@/components/chat/ChatContainer.vue';
import VideoContainer from '@/components/video/VideoController.vue';
import RoomViewer from '@/components/roomViewer/RoomViewer.vue';

export default {
  components: {
    // ChatContainer,
    // VideoContainer,
    RoomViewer
  }
};
</script>

<style lang="scss">
.RoomViewerContainer {
  max-width: 600px;
  background-color: #fff;
  width: 100%;
  margin: 40px auto;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 12px;
}
</style>
