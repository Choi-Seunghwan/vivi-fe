<template>
  <TopNav @navHome="navHome" @navSignIn="navSignIn" @navBroadcast="navBroadcast"></TopNav>
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

    const navSignIn = () => {
      router.push({ name: 'SignIn' });
    };

    const navBroadcast = () => {
      router.push({ name: 'Broadcast' });
    };

    return {
      navHome,
      navSignIn,
      navBroadcast,
    };
  }
});
</script>

<style></style>
