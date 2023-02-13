<template>
  <div class="chat-container">
    <div class="chat-messages">
      <div v-for="(chatMessage, i) in chatMessages" :key="i" class="message-item">
        <span>{{ chatMessage.message }}</span>
      </div>
    </div>
    <div class="input-wrap">
      <BasicInput v-model="inputMessage" :placeholder="parseStr('input')" />
      <BasicButton @click="sendBtnHandler">{{ parseStr('CHAT_SEND') }}</BasicButton>
    </div>
  </div>
</template>

<script lang="ts">
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

    const sendBtnHandler = () => {
      chatMessageHandler.sendRoomChatMessage(inputMessage.value);
    };

    const chatMessages = computed(() => store.getters['chat/chatMessages']);

    return { parseStr, sendBtnHandler, inputMessage, chatMessages };
  }
};
</script>

<style lang="scss" scoped>
.chat-container {
  display: flex;
}

.input-wrap {
  margin-top: auto;
}
</style>
