<template>
  <div class="nav-container">
    <TopNav
      @navHome="navHome"
      @navSignOff="navSignOff"
      @navSignIn="navSignIn"
      @navBroadcast="navBroadcast"
      @test="test"
      class="nav top-nav"
      :class="{ hide: !showTopNav }"
    />

    <BroadcastTopNav :class="{ hide: !showBroadcastNav }" class="nav broadcast-nav" />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { computed } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import TopNav from '@/components/navigator/TopNav.vue';
import BroadcastTopNav from './BroadcastTopNav.vue';
import type MessageManager from '@/service/MessageManager';
import type ServiceManager from '@/service/ServiceManager';

export default defineComponent({
  name: 'NavContainer',
  components: { TopNav, BroadcastTopNav },
  setup(props, context) {
    const store = useStore();
    const router = useRouter();
    const services: ServiceManager = inject('$service')!;
    const authService = services.authService;

    const messageManager: MessageManager = inject('$message')!;
    const roomMessageHandler = messageManager.roomMessageHandler;

    const navHome = () => {
      router.push({ name: 'Home' });
    };

    const navSignIn = () => {
      router.push({ name: 'SignIn' });
    };

    const navSignOff = async () => {
      await authService.signOff();
    };

    const navBroadcast = () => {
      router.push({ name: 'Broadcast' });
    };

    const test = () => {
      roomMessageHandler.test();
    };

    const showTopNav = computed(() => store.getters['context/showTopNav']);
    const showBroadcastNav = computed(() => {
      if (!showTopNav.value) return true;
      else return false;
    });

    return {
      navHome,
      navSignIn,
      navBroadcast,
      navSignOff,
      test,
      showTopNav,
      showBroadcastNav
    };
  }
});
</script>

<style lang="scss" scoped>
.nav-container {
  position: relative;
  width: 100%;
  height: 56px;
}

.nav {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  padding: 0 12px 0 12px;
  margin: 0;
  transition: all ease 0.8s;
}
.top-nav {
  &.hide {
    pointer-events: none;
    top: -56px;
  }
}

.broadcast-nav {
  &.hide {
    pointer-events: none;
    top: -100px;
  }
}
</style>
