<template>
  <div class="chat-message">
    <p class="nickname">{{ user?.nickname }}</p>
    <span class="message">{{ message }}</span>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    user: { default: {}, type: Object },
    message: { default: '', type: String }
  },
  setup(props, context) {
    const user = props.user;
    const message = props.message;

    return { user, message };
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
}
</style>
