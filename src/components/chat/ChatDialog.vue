<template>
  <div class="chat-dialog">
    <div v-for="(message, i) in messages" :key="i">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    messages: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss" scoped>
.chat-dialog {
  min-height: 200px;
  width: 100%;
}
</style>
