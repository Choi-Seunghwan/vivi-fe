<template>
  <div class="broadcast-controller">
    <h2 class="heading">{{ parseStr('SETTING') }}</h2>
    <div class="room-info">
      <div class="title">
        <h4 class="title-text">{{ parseStr('BROADCAST_TITLE') }}</h4>
        <BasicInput
          :placeholder="parseStr('BROADCAST_TITLE_PLACEHOLDER')"
          v-model="title"
          class="title-input"
          underline
        />
      </div>
    </div>
    <div class="bottom">
      <BasicButton @click="startBtnHandler" :disabled="startBtnDisabled" class="start-btn">
        {{ parseStr('BROADCAST_START') }}
      </BasicButton>
    </div>
  </div>
</template>

<script lang="ts">
import { parseStr } from '@/utils';
import BasicButton from '@/components/common/BasicButton.vue';
import BasicInput from '@/components/common/BasicInput.vue';
import { computed, ref } from '@vue/reactivity';
import { inject } from '@vue/runtime-core';
import type MessageManager from '@/service/MessageManager';

export default {
  components: { BasicButton, BasicInput },
  setup(props, context) {
    const messageManager: MessageManager = inject('$message')!;
    const roomMessageHandler = messageManager.roomMessageHandler;

    const title = ref('');
    const tag = ref('');
    // const tagList = ['TALK', 'SONG', 'DATE'];

    const tagHandler = (v: string) => {
      tag.value = v;
    };

    const startBtnHandler = async () => {
      createRoom();
    };

    const createRoom = async () => {
      await roomMessageHandler.createRoom({ title: title.value });
      context.emit('setSettingVisibility', false);
    };

    const selectedTag = computed(() => tag);
    const startBtnDisabled = computed(() => !tag || !title);

    return {
      title,
      // tag,
      // tagList,
      parseStr,
      tagHandler,
      startBtnHandler,
      createRoom,
      selectedTag,
      startBtnDisabled
    };
  }
};
</script>

<style lang="scss" scoped>
.broadcast-controller {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .heading {
    font-size: 16px;
    text-align: center;
  }

  .divider {
    margin: 4px 0;
  }
  .room-info {
    margin-top: 30px;

    .title {
      .title-text {
        font-size: 16px;
      }
      .title-input {
        margin-top: 6px;
        width: 50%;
      }
    }
  }

  .bottom {
    margin-top: auto;
    margin-left: auto;
    margin-right: auto;
    .start-btn {
      width: 80px;
      font-size: 14px;
      font-weight: bold;
    }
  }
}
</style>
