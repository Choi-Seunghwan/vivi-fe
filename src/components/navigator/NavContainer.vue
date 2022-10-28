<template>
  <TopNav @login="loginHandler"></TopNav>
</template>

<script lang="ts">
import TopNav from '@/components/navigator/TopNav.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NavContainer',
  components: { TopNav },
  methods: {
    loginHandler() {
      // service
    }
  }
});
</script>

<style></style>
