<template>
  <div class="broadcast-controller">
    <h2>{{ parseStr('BROADCAST_INFO') }}</h2>
    <hr class="divider" />
    <div class="room-info">
      <div class="title">
        <h4 class="title-text">{{ parseStr('BROADCAST_TITLE') }}</h4>
        <input :placeholder="parseStr('BROADCAST_TITLE_PLACEHOLDER')" v-model="title" class="title-input" />
      </div>
    </div>
    <BasicButton @click="startBtnHandler" theme="white" class="start-btn">
      {{ parseStr('BROADCAST_START') }}
    </BasicButton>
  </div>
</template>

<script>
import { parseStr } from '@/utils';
import BasicButton from '@/components/BasicButton.vue';

export default {
  components: { BasicButton },
  data() {
    return {
      title: ''
    };
  },
  methods: {
    parseStr,
    startBtnHandler() {
      const { title } = this;
      const roomInfo = { title };
      this.$emit('createRoom', roomInfo);
    }
  },
  async mounted() {
    this.$emit('init');
  }
};
</script>

<style lang="scss" scoped>
.broadcast-controller {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  > h2 {
    font-size: 20px;
  }

  .divider {
    margin: 20px 0;
  }
  .room-info {
    .title {
      .title-text {
        font-size: 18px;
      }
      .title-input {
        margin-top: 6px;
        width: 100%;
        height: 38px;
      }
    }
  }

  .start-btn {
    font-size: 16px;
    font-weight: bold;
    margin-top: auto;
  }
}
</style>
