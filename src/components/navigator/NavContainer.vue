<template>
  <TopNav @navHome="navHome" @navSignOff="navSignOff" @navSignIn="navSignIn" @navBroadcast="navBroadcast"></TopNav>
</template>

<script lang="ts">
import TopNav from '@/components/navigator/TopNav.vue';
import type ServiceManager from '@/service/ServiceManager';
import { defineComponent, inject } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'NavContainer',
  components: { TopNav },
  setup(props, context) {
    const router = useRouter();
    const services: ServiceManager = inject('$service')!;
    const authService = services.authService;

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

    return {
      navHome,
      navSignIn,
      navBroadcast,
      navSignOff
    };
  }
});
</script>

<style></style>
