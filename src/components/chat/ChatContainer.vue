<template>
  <div class="chat-container">
    <div class="chat-messages">
      <div v-for="(chatMessage, i) in chatMessages" :key="i" class="message-item">
        <p>{{ chatMessage?.user?.nickname }}</p>
        <span>{{ chatMessage?.message }}</span>
      </div>
    </div>
    <div class="input-wrap">
      <BasicInput
        v-model="inputMessage"
        underline
        :placeholder="parseStr('CHAT_MESSAGE_INPUT_PLACEHOLDER')"
        class="message-input"
      />
      <BasicButton @click="sendBtnHandler" class="message-send-btn">{{ parseStr('CHAT_MESSAGE_SEND') }}</BasicButton>
    </div>
  </div>
</template>

<script lang="ts">
import type { ComputedRef } from 'vue';
import { computed, inject } from '@vue/runtime-core';
import { ref } from '@vue/reactivity';
import { useStore } from 'vuex';

import { parseStr } from '@/utils';
import BasicInput from '../common/BasicInput.vue';
import BasicButton from '../common/BasicButton.vue';
import type MessageManager from '@/service/MessageManager';

export default {
  name: 'ChatContainer',
  components: { BasicInput, BasicButton },
  setup() {
    const store = useStore();
    const messageManager: MessageManager = inject('$message')!;
    const chatMessageHandler = messageManager.chatMessageHandler;
    const inputMessage = ref('');
    const room: ComputedRef<Room> = computed(() => store.getters['room/getRoom']);
    const chatMessages = computed(() => store.getters['chat/chatMessages']);

    const sendBtnHandler = () => {
      if (!room?.value?.roomId) return;

      const sendMessage: SendChatMessage = { roomId: room.value.roomId, message: inputMessage.value };
      chatMessageHandler.sendRoomChatMessage(sendMessage);
    };

    return { parseStr, sendBtnHandler, inputMessage, chatMessages };
  }
};
</script>

<style lang="scss" scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  padding-left: 12px;
  padding-right: 12px;
  padding-bottom: 20px;
}

.chat-messages {
  width: 100%;
  height: 100%;
}

.input-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;
  padding-right: 25%;

  .message-input {
    width: 100%;
    margin-right: 20px;
  }

  .message-send-btn {
    width: 80px;
  }
}
</style>
