<template>
  <div class="chat-container w-full h-full"></div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    roomId: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState('room', ['room', 'chatMessages']),
    members() {
      return this.room?.members;
    },
    messages() {
      return this.chatMessages;
    }
  },
  methods: {
    sendMessage(message) {
      if (!this.room) return;
      this._service.sendChatMessage({ roomId: this.room?.roomId, message });
    }
  }
};
</script>

<style lang="scss">
.chat-container {
  background-color: #d3d3d3;
  margin-bottom: 20px;
}
</style>
