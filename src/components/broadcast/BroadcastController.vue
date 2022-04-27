<template>
  <div class="broadcast-controller">
    <h2 class="heading">{{ parseStr('BROADCAST_INFO') }}</h2>
    <hr class="divider" />
    <div class="room-info">
      <div class="tag">
        <h4 class="tag-text">방송 주제</h4>
        <div class="tag-list">
          <BasicButton
            v-for="tag in tagList"
            :key="tag"
            :value="tag"
            @click="tagHandler(tag)"
            :checked="tag === selectedTag"
          >
            {{ parseStr(`ROOM_TAG_${tag}`) }}
          </BasicButton>
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

<script>
import { parseStr } from '@/utils';
import BasicButton from '@/components/common/BasicButton.vue';
import BasicInput from '@/components/common/BasicInput.vue';

export default {
  components: { BasicButton, BasicInput },
  data() {
    return {
      title: '',
      tag: ''
    };
  },
  methods: {
    parseStr,
    startBtnHandler() {
      const { title, tag } = this;
      const roomInfo = { title, tag };
      this.$emit('createRoom', roomInfo);
    },
    tagHandler(tag) {
      this.tag = tag;
    }
  },
  computed: {
    tagList() {
      return ['TALK', 'SONG', 'DATE'];
    },
    selectedTag() {
      return this.tag;
    },
    startBtnDisabled() {
      return !this.tag || !this.title;
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
