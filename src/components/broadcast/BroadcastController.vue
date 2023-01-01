<template>
  <div class="broadcast-controller">
    <h2 class="heading">{{ parseStr('BROADCAST_INFO') }}</h2>
    <hr class="divider" />
    <div class="room-info">
      <div class="tag">
        <h4 class="tag-text">방송 주제</h4>
        <div class="tag-list">
          {{ parseStr(`ROOM_TAG_${tag}`) }}
        </div>
      </div>
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
    <BasicButton @click="startBtnHandler" :disabled="startBtnDisabled" class="start-btn">
      {{ parseStr('BROADCAST_START') }}
    </BasicButton>
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
    const messageManager: MessageManager = inject('$service')!;
    const roomMessageHandler = messageManager.roomMessageHandler;

    const title = ref('');
    const tag = ref('');
    const tagList = ['TALK', 'SONG', 'DATE'];

    const tagHandler = (v: string) => {
      tag.value = v;
    };
    const startBtnHandler = () => {};

    const createRoom = async () => {
      await roomMessageHandler.createRoom({ title: title.value });
    };

    const selectedTag = computed(() => tag);
    const startBtnDisabled = computed(() => !tag || !title);
    return {
      title,
      tag,
      tagList,
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
    font-size: 20px;
    text-align: center;
  }

  .divider {
    margin: 4px 0;
  }
  .room-info {
    margin-top: 30px;

    .tag {
      .tag-text {
        font-size: 18px;
      }
      .tag-list {
        display: flex;
        margin-top: 12px;
        gap: 8px;
      }
    }
    .title {
      margin-top: 20px;
      .title-text {
        font-size: 18px;
      }
      .title-input {
        margin-top: 6px;
        width: 50%;
      }
    }
  }

  .start-btn {
    width: 100px;
    font-size: 16px;
    font-weight: bold;
    margin-top: auto;
    margin-bottom: 40px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
