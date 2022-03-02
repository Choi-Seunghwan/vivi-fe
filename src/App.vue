<template>
  <div id="app">
    <BaseLayout>
      <router-view />
    </BaseLayout>
  </div>
</template>

<script>
import _remove from "lodash/remove";
import BaseLayout from "@/layouts/BaseLayout.vue";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    BaseLayout,
  },
  methods: {
    // ...mapActions('context', ['initContext']),
    ...mapActions("account", { initAccount: "init" }),
    // ...mapActions('networkConnector', ['initNetworkConnector'])
  },
  beforeMount() {
    console.log(this);
    this._service.setApp(this);
  },
  mounted() {
    // this.initContext();
    this.initAccount();
    // this.testCode();
    // this.initNetworkConnector();
  },
};
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
</style>
