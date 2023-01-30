<template>
  <nav class="top-nav" :class="{ hide: !showTopNav }">
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
      <BasicButton v-if="!isSignIn()" @click="signInBtnHandler">{{ parseStr('SIGN_IN') }}</BasicButton>
      <BasicButton v-else @click="signOffBtnHandler">{{ parseStr('SIGN_OFF') }}</BasicButton>
      <BasicButton @click="testBtnHandler">{{ parseStr('TEST') }}</BasicButton>
    </div>
  </nav>
</template>

<script lang="ts">
import { parseStr } from '@/utils';
import Avatar from '@/components/common/Avatar.vue';
import BasicButton from '@/components/common/BasicButton.vue';
import BasicInput from '@/components/common/BasicInput.vue';
import type ServiceManager from '@/service/ServiceManager';
import { computed, inject } from '@vue/runtime-core';
import { useStore } from 'vuex';

export default {
  name: 'TopNav',
  components: { Avatar, BasicButton, BasicInput },
  setup(props, context) {
    const store = useStore();

    /** Test code */
    // const services: ServiceManager = inject('$service')!;

    const isSignIn = (): boolean => {
      return store.getters['auth/isSignIn'];
    };

    const titleBtnHandler = () => {
      context.emit('navHome');
    };

    const broadcastBtnHandler = () => {
      context.emit('navBroadcast');
    };

    const signInBtnHandler = () => {
      context.emit('navSignIn');
    };

    const signOffBtnHandler = () => {
      context.emit('navSignOff');
    };

    const testBtnHandler = () => {
      context.emit('test');
    };

    return {
      parseStr,
      isSignIn,
      titleBtnHandler,
      broadcastBtnHandler,
      signInBtnHandler,
      signOffBtnHandler,
      testBtnHandler
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
