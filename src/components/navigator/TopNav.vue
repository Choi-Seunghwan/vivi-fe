<template>
  <nav class="top-nav">
    <div class="left-wrap">
      <h2 @click="titleClickHandler" class="logo">
        {{ parseStr('LOGO') }}
      </h2>
    </div>
    <div class="right-wrap">
      <Avatar v-if="isLogin" />
      <BasicButton class="login-btn" v-else @click="loginBtnHandler">{{ parseStr('LOGIN') }}</BasicButton>
      <button class="menu-btn"><img @click="menuIconHandler" :src="'images/menu-icon.svg'" class="menu-icon" /></button>
    </div>
  </nav>
</template>
<script>
import { parseStr } from '@/utils';
import { mapActions, mapGetters } from 'vuex';
import pageRouteMixin from '@/mixin/pageRouteMixin';
import Avatar from '@/components/Avatar.vue';
import BasicButton from '@/components/BasicButton.vue';

export default {
  name: 'TopNav',
  mixins: [pageRouteMixin],
  components: {
    Avatar,
    BasicButton
  },
  computed: {
    ...mapGetters('auth', ['isLogin'])
  },
  methods: {
    parseStr,
    ...mapActions('context', ['toggleSideNav']),

    titleClickHandler() {
      this.$router.push('/');
    },

    menuIconHandler() {
      this.toggleSideNav();
    },

    loginBtnHandler() {
      this.$_routeLoginPage();
    }
  }
};
</script>
<style lang="scss">
@import '@/assets/scss/theme';

.top-nav {
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: space-between;
  z-index: 3;
  padding: 12px;

  .left-wrap {
    display: flex;

    .logo {
      color: #ffffff;
      cursor: pointer;
      font-size: 30px;
    }
  }

  .right-wrap {
    display: flex;

    .menu-btn {
      width: 36px;
      height: 36px;
      cursor: pointer;
    }
  }
}
</style>
