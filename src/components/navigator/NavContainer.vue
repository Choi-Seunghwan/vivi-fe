<template>
  <TopNav @login="loginHandler"></TopNav>
</template>

<script lang="ts">
import TopNav from '@/components/navigator/TopNav.vue';
import { defineComponent } from 'vue';
import pageRouteMixin from '@/mixin/pageRouteMixin';

export default defineComponent({
  name: 'NavContainer',
  mixins: [pageRouteMixin],
  components: { TopNav },
  methods: {
    loginHandler() {
      this.$_routeLoginPage();
    }
  }
});
</script>

<style></style>
