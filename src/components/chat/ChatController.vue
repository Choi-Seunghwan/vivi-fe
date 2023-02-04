<template>
  <div class="ChatControl">
    <div class="inputWrap">
      <input class="inputWrap__chatText" />
    </div>
    <div class="btnWrap">
      <button @click="sendBtnHandler" class="controller__submit">
        {{ parseStr('send') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { parseStr } from '@/utils';
export default {
  name: 'ChatController',
  setup() {
    const sendBtnHandler = () => {};

    return { parseStr, sendBtnHandler };
  }
};
</script>

<style lang="scss" scoped>
.ChatControl {
  display: flex;
  justify-content: center;

  .inputWrap {
    flex-basis: 50%;
    margin-right: 15px;
    &__chatText {
      width: 100%;
    }
  }
  .btnWrap {
    &__submit {
    }
  }
}
</style>
