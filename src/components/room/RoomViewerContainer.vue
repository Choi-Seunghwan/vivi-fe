<template>
  <div class="room-viewer-container">
    <div class="room-info">
      <BasicButton @click="goBackBtnHandler" class="go-back-btn">
        {{ parseStr('GO_BACK') }}
      </BasicButton>
      <BasicButton v-show="isHost" @click="settingBtnHandler" class="setting-btn">
        {{ parseStr('SETTING') }}
      </BasicButton>
    </div>
    <div class="viewer">
      <Screen />
    </div>
  </div>
</template>

<script lang="ts">
import { mapActions, mapState, mapGetters } from 'vuex';
import { parseStr } from '@/utils';
import Screen from '@/components/screen/Screen.vue';
import BasicButton from '@/components/common/BasicButton.vue';

export default {
  name: 'RoomViewerContainer',
  components: { Screen, BasicButton },
  props: {
    isHost: { type: Boolean, default: false }
  },
  setup(props, context) {
    const isHost = props.isHost;
    const settingBtnHandler = () => {
      context.emit('toggleSetting');
    };

    const goBackBtnHandler = () => {
      context.emit('goBack');
    };

    return {
      parseStr,
      isHost,
      goBackBtnHandler,
      settingBtnHandler
    };
  }
};
</script>

<style lang="scss">
.room-viewer-container {
  width: 100%;
  height: 100%;
  background-color: rgba(#fff, 1);
  background-color: #fff;

  .viewer {
    display: flex;
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
    gap: 8px;
    background: #ccc;
  }

  .room-info {
    position: absolute;
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 100%;
    height: 50px;
    z-index: 1;
    top: 0;
    left: 0;
    background: rgba(#000, 0.2);

    .go-back-btn {
      margin-left: 12px;
    }

    .setting-btn {
      margin-left: auto;
      margin-right: 12px;
    }
  }
}
</style>
