<template>
  <PageLayout class="broadcast">
    <h2 class="heading">{{ parseStr('BROADCAST_SETTING') }}</h2>
    <div class="room-info">
      <div class="title">
        <h4 class="title-text">{{ parseStr('BROADCAST_TITLE') }}</h4>
        <BasicInput :placeholder="parseStr('BROADCAST_TITLE_PLACEHOLDER')" v-model="title" class="title-input" />
      </div>
    </div>
    <div class="media-info">
      <Screen :stream="stream" />
    </div>
    <div class="bottom">
      <BasicButton @click="startBtnHandler" :disabled="startBtnDisabled" class="start-btn">
        {{ parseStr('BROADCAST_START') }}
      </BasicButton>
    </div>
  </PageLayout>
</template>

<script lang="ts">
import { computed, inject, onMounted, onUnmounted, ref, type ComputedRef, type Ref } from 'vue';
import { useStore } from 'vuex';
import { parseStr } from '@/utils';
import type MessageManager from '@/service/MessageManager';
import { useRouter } from 'vue-router';
import { mediaManager, MediaManager } from '@/modules/MediaManager';

import PageLayout from '@/components/layout/PageLayout.vue';
import BasicInput from '@/components/common/BasicInput.vue';
import BasicButton from '@/components/common/BasicButton.vue';
import Screen from '@/components/screen/Screen.vue';

export default {
  name: 'Broadcast',
  components: {
    PageLayout,
    BasicInput,
    BasicButton,
    Screen
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const room: ComputedRef<Room> = computed(() => store.getters['room/getRoom']);
    const messageManager: MessageManager = inject('$message')!;
    const roomMessageHandler = messageManager.roomMessageHandler;

    const stream: Ref<MediaStream | null> = ref(null);

    const title = ref('');
    const tag = ref('');
    const isBroadcastProcess = ref(false);

    const tagHandler = (v: string) => {
      tag.value = v;
    };

    const startBtnHandler = async () => {
      createRoom();
    };

    const createRoom = async () => {
      if (!title.value) return;
      if (!mediaManager.getLocalStream()) return;

      isBroadcastProcess.value = true;
      await roomMessageHandler.createRoom({ title: title.value });
    };

    const ackCreateRoom = () => {
      const roomId = room.value.roomId;
      router.push({ name: 'Room', params: { roomId } });
    };

    const initLocalStreamCb = async () => {
      const localStream: MediaStream = <MediaStream>mediaManager.getLocalStream();
      stream.value = localStream;
    };

    const selectedTag = computed(() => tag);
    const startBtnDisabled = computed(() => !tag || !title);

    onMounted(async () => {
      setTimeout(async () => {
        await mediaManager.initLocalStream(initLocalStreamCb.bind(this));
      });
      roomMessageHandler.setAckHandler(roomMessageHandler.ackCreateRoom.name, ackCreateRoom.bind(this));
    });

    onUnmounted(() => {
      roomMessageHandler.releaseAckHandler(roomMessageHandler.ackCreateRoom.name);

      if (!isBroadcastProcess.value) mediaManager.clearLocalStream();
    });

    return { parseStr, title, tagHandler, startBtnHandler, createRoom, selectedTag, startBtnDisabled, stream };
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/base.scss';

.broadcast {
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
        width: 100%;
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
