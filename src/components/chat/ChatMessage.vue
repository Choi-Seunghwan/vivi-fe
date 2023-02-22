<template>
  <div class="chat-message">
    <p class="nickname">{{ user?.nickname }}</p>
    <span v-if="type === CHAT_MESSAGE_TYPE_NORMAL" class="message">{{ message }}</span>
    <span v-else-if="type === CHAT_MESSAGE_TYPE_SYSTEM" class="message">{{ parseStr(message) }}</span>
    <span v-else class="message system">{{ message }}</span>
  </div>
</template>

<script lang="ts">
import { CHAT_MESSAGE_TYPE_NORMAL, CHAT_MESSAGE_TYPE_SYSTEM } from '@/constant/chat';
import { parseStr } from '@/utils';

export default {
  props: {
    user: { default: {}, type: Object },
    message: { default: '', type: String },
    type: { default: CHAT_MESSAGE_TYPE_NORMAL, type: String }
  },
  setup(props, context) {
    const user = props.user;
    const message = props.message;
    const type = props.type;

    return { parseStr, user, message, type, CHAT_MESSAGE_TYPE_NORMAL, CHAT_MESSAGE_TYPE_SYSTEM };
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/base';

.chat-message {
  .nickname {
    font-weight: bold;
    font-size: 18px;
  }

  .message {
    font-size: 16px;

    &.system {
      font-weight: bold;
    }
  }
}
</style>
