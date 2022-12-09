<template>
  <div class="login">
    <div class="login-wrap">
      <h1>{{ parseStr('LOGIN_TITLE') }}</h1>
      <div class="input-wrap">
        <input :placeholder="'Id'" v-model="email" class="input id" />
        <input :placeholder="'Pw'" v-model="password" class="input password" />
        <button @click="loginBtnHandler" class="button">Login</button>
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

    const login = async () => {
      const result = await authService.signIn({ email: email.value, password: password.value });
      console.log('@@', result);
    };
    const loginBtnHandler = () => {
      login();
    };

    return {
      email,
      password,
      parseStr,
      login,
      loginBtnHandler
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
