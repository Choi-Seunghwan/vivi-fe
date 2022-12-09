<template>
  <nav class="top-nav">
    <div class="left-wrap">
      <h2 @click="titleClickHandler" class="logo">
        {{ parseStr('VIVI') }}
      </h2>
    </div>
    <div class="right-wrap">
      <BasicButton
        ><a class="broadcast" @click="broadcastHandler">{{ parseStr('BROADCASTING') }}</a></BasicButton
      >
      <BasicButton @click="loginBtnHandler">로그인</BasicButton>
      <div class="my">
        <BasicInput class="nickname" :maxLength="10" v-model="_nickname" useConfirm @focus="nicknameFocusHandler" />
      </div>
    </div>
  </nav>
</template>
<script>
import { parseStr } from '@/utils';
import { mapGetters } from 'vuex';
import Avatar from '@/components/common/Avatar.vue';
import BasicButton from '@/components/common/BasicButton.vue';
import BasicInput from '@/components/common/BasicInput.vue';

export default {
  name: 'TopNav',
  components: { Avatar, BasicButton, BasicInput },
  computed: {
    ...mapGetters('auth', ['accountInfo']),
    _nickname: {
      set(v) {
        this.nicknameHandler(v);
      },
      get() {
        return this.nickname;
      }
    },
    _accountInfo() {
      return this.accountInfo || {};
    },
    nickname() {
      return this._accountInfo?.nickname || '';
    }
  },
  methods: {
    parseStr,
    titleClickHandler() {
      this.$router.push('/');
    },
    nicknameFocusHandler() {},
    broadcastHandler() {
      this.$router.push({ name: 'Broadcast' });
    },
    loginBtnHandler() {
      this.$emit('login');
    },
    async nicknameHandler(v) {
      const result = await this._service.changeNickname(v);
    }
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

    .broadcast {
      cursor: pointer;
      margin-right: 12px;
    }
    .my {
      .nickname {
        width: 140px;
      }
    }
  }
}
</style>
