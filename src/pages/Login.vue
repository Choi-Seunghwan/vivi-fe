<template>
  <div class="login">
    <div class="login-wrap">
      <h1>{{ parseStr('SIGN_IN_TITLE') }}</h1>
      <div class="input-wrap">
        <input :placeholder="'Id'" v-model="email" class="input id" />
        <input :placeholder="'Pw'" v-model="password" class="input password" />

        <button v-if="!isSignIn" @click="signBtnHandler" class="button">{{ parseStr('SIGN_IN') }}</button>
        <button v-if="isLogin" @click="signOffBtnHandler" class="button">{{ parseStr('SIGN_OFF') }}</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { parseStr } from '@/utils';
import _get from 'lodash/get';
import pageRouteMixin from '@/mixin/pageRouteMixin';
import { ref } from '@vue/reactivity';
import { inject } from '@vue/runtime-core';
import type ServiceManager from '@/service/ServiceManager';

export default {
  mixins: [pageRouteMixin],
  setup() {
    const email = ref('');
    const password = ref('');

    const services: ServiceManager = inject('$service')!;
    const authService = services.authService;

    const signIn = async () => {
      await authService.signIn({ email: email.value, password: password.value });
    };

    const signOff = async () => {};

    const signInBtnHandler = () => {
      signIn();
    };

    const signOffBtnHandler = () => {
      signOff();
    };

    return {
      email,
      password,
      parseStr,
      signIn,
      signInBtnHandler,
      signOffBtnHandler
    };
  }
};
</script>

<style lang="scss" scoped>
.login {
  .login-wrap {
    .input-wrap {
      .input {
        &.id {
        }

        &.password {
        }
      }
    }
  }
}
</style>
