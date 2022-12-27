<template>
  <TopNav @navHome="navHome" @navLogin="navLogin" @navBroadcast="navBroadcast"></TopNav>
</template>

<script lang="ts">
import TopNav from '@/components/navigator/TopNav.vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'NavContainer',
  components: { TopNav },
  setup(props, context) {
    const router = useRouter();

    const navHome = () => {
      router.push({ name: 'Home' });
    };

    const navLogin = () => {
      router.push({ name: 'Login' });
    };

    const navBroadcast = () => {
      router.push({ name: 'Home' });
    };

    return {
      navHome,
      navLogin,
      navBroadcast
    };
  }
});
</script>

<style></style>
