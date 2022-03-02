<template>
  <div class="chat-container">
    <slot name="background"></slot>
    <div v-if="!room" class="no-room">방이 없음</div>
    <div v-else class="chat-container-inner">
      <div class="members">
        <p>참여자</p>
        <div v-for="(member, i) in members" :key="i">
          <span>{{ member.nickname }}</span>
        </div>
      </div>
      <hr />
      <ChatDialog :messages="messages" />
      <ChatControl @sendMessage="sendMessage" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ChatDialog from './ChatDialog.vue';
import ChatControl from './ChatControl.vue';

export default {
  components: {
    ChatDialog,
    ChatControl
  },
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
  },
  beforeMount() {
    // this.initReceiveChatMessageHandler(this.receiveChatMessageHandler.bind(this));
  }
};
</script>

<style lang="scss">
.chat-container {
  width: 100%;
  background-color: #d3d3d3;
  margin-bottom: 20px;
}
</style>
