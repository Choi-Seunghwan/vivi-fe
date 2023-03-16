<template>
  <div class="chat-message">
    <p class="nickname">{{ user?.nickname }}</p>
    <span v-if="type === CHAT_MESSAGE_TYPE_NORMAL" class="message">{{ parseNormalMessage(messageInfo) }}</span>
    <span v-else-if="type === CHAT_MESSAGE_TYPE_SYSTEM" class="message system">
      <span>{{ parseSystemMessage(messageInfo) }}</span>
    </span>
    <span v-else class="message">{{ messageInfo }}</span>
  </div>
</template>

<script lang="ts">
import { CHAT_MESSAGE_TYPE_NORMAL, CHAT_MESSAGE_TYPE_SYSTEM, SYSTEM_CHAT_MESSAGE_ROOM_MEMBER_JOINED } from '@/constant';
import { parseStr } from '@/utils';

export default {
  props: {
    user: { default: {}, type: Object },
    messageInfo: { default: '', type: Object },
    type: { default: CHAT_MESSAGE_TYPE_NORMAL, type: String }
  },
  setup(props, context) {
    const user = props.user;
    const messageInfo = props.messageInfo;
    const type = props.type;

    const parseNormalMessage = messageInfo => {
      return parseStr(messageInfo?.message);
    };
    const parseSystemMessage = messageInfo => {
      if (messageInfo?.message === SYSTEM_CHAT_MESSAGE_ROOM_MEMBER_JOINED)
        return `${messageInfo?.nickname} ${parseStr(messageInfo?.message)}`;

      return parseStr(messageInfo?.message);
    };

    return {
      parseStr,
      user,
      messageInfo,
      type,
      CHAT_MESSAGE_TYPE_NORMAL,
      CHAT_MESSAGE_TYPE_SYSTEM,
      parseNormalMessage,
      parseSystemMessage
    };
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
