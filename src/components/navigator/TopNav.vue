<template>
  <nav class="top-nav">
    <div class="left-wrap">
      <h2 @click="titleBtnHandler" class="logo">
        {{ parseStr('VIVI') }}
      </h2>
    </div>
    <div class="right-wrap">
      <BasicButton>
        <a class="broadcast" @click="broadcastBtnHandler">
          {{ parseStr('BROADCASTING') }}
        </a>
      </BasicButton>
      <BasicButton @click="loginBtnHandler">
        {{ parseStr('SIGN_IN') }}
      </BasicButton>
    </div>
  </nav>
</template>

<script lang="ts">
import { parseStr } from '@/utils';
import Avatar from '@/components/common/Avatar.vue';
import BasicButton from '@/components/common/BasicButton.vue';
import BasicInput from '@/components/common/BasicInput.vue';
import type ServiceManager from '@/service/ServiceManager';
import { inject } from '@vue/runtime-core';
import { useRouter } from 'vue-router';

export default {
  name: 'TopNav',
  components: { Avatar, BasicButton, BasicInput },
  setup(props, context) {
    const services: ServiceManager = inject('$service')!;

    const titleBtnHandler = () => {
      context.emit('navHome');
    };

    const broadcastBtnHandler = () => {
      context.emit('navBroadcast');
    };

    const loginBtnHandler = () => {
      context.emit('navLogin');
    };

    return {
      parseStr,
      titleBtnHandler,
      broadcastBtnHandler,
      loginBtnHandler
    };
  }
};
</script>
<style lang="scss">
@import '@/assets/scss/base';

.top-nav {
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: space-between;
  z-index: 10;
  padding: 12px;

  .left-wrap {
    display: flex;
    align-items: center;

    .logo {
      font-family: 'SBAggroB';
      color: #ffffff;
      cursor: pointer;
      font-size: 30px;
      background: $color-gradient-primary;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .logo-img {
      width: 60px;
    }
  }

  .right-wrap {
    display: flex;
    align-items: center;
    gap: 8px;

    .broadcast {
      cursor: pointer;
    }
    .my {
      .nickname {
        width: 140px;
      }
    }
  }
}
</style>
