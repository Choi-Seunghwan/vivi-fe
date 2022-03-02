<template>
  <div class="broadcast-controller">
    <div class="room-type">
      <h4 class="room-type__text">
        {{ parseStr("BROADCAST_TYPE") }}
      </h4>
      <div class="roomType__inputs">
        <button class="input">
          {{ parseStr("BROADCAST_TYPE_VIDEO") }}
        </button>
        <button class="input">
          {{ parseStr("BROADCAST_TYPE_RADIO") }}
        </button>
      </div>
    </div>
    <div class="roomForm">
      <div class="title">
        <h4 class="title__text">{{ parseStr("BROADCAST_TITLE") }}</h4>
        <input
          :placeholder="parseStr('BROADCAST_TITLE')"
          v-model="title"
          class="title__input"
        />
      </div>
    </div>
    <div class="interface">
      <button @click="startBtnHandler">
        {{ parseStr("BROADCAST_START") }}
      </button>
    </div>
  </div>
</template>

<script>
import { parseStr } from "@/utils";

export default {
  props: {},
  data() {
    return {
      title: "",
    };
  },
  computed: {
    settings() {
      return this.value;
    },
  },
  methods: {
    parseStr,
    async startBtnHandler() {
      const { title } = this;
      const roomInfo = { title };
      this.$emit("createRoom", roomInfo);
    },
  },
  async mounted() {
    this.$emit("init");
  },
};
</script>

<style lang="scss" scoped>
.room-creator {
  width: 100%;
  height: 100%;
}
</style>
