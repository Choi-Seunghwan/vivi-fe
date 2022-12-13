<template>
  <nav class="top-nav">
    <div class="left-wrap">
      <h2 @click="titleHandler" class="logo">
        {{ parseStr('VIVI') }}
      </h2>
    </div>
    <div class="right-wrap">
      <BasicButton>
        <a class="broadcast" @click="broadcastHandler">
          {{ parseStr('BROADCASTING') }}
        </a>
      </BasicButton>
      <BasicButton @click="loginBtnHandler">
        {{ parseStr('LOGIN') }}
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
    const router = useRouter();

    const titleHandler = () => {
      router.push({ name: 'Home' });
    };

    const broadcastHandler = () => {
      router.push({ name: 'Broadcast' });
    };

    const loginBtnHandler = () => {
      context.emit('login');
    };

    return {
      parseStr,
      titleHandler,
      broadcastHandler,
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
