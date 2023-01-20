<template>
  <div class="login">
    <div class="login-wrap">
      <h1>{{ parseStr('SIGN_IN_TITLE') }}</h1>
      <div class="input-wrap">
        <input :placeholder="'Id'" v-model="email" class="input id" />
        <input :placeholder="'Pw'" type="password" v-model="password" class="input password" />

        <button @click="signInBtnHandler" class="button">{{ parseStr('SIGN_IN') }}</button>
        <input type="checkbox" v-model="isAutoSignIn" />{{ parseStr('AUTO_SIGN_IN') }}
        <!-- <button v-else @click="signOffBtnHandler" class="button">{{ parseStr('SIGN_OFF') }}</button> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { parseStr } from '@/utils';
import { ref } from '@vue/reactivity';
import { inject } from '@vue/runtime-core';
import type ServiceManager from '@/service/ServiceManager';
import store from '@/store/store';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const isAutoSignIn = ref(false);

    const services: ServiceManager = inject('$service')!;
    const authService = services.authService;

    const isSignIn = (): boolean => {
      return store.getters['auth/isLogin'];
    };

    const signIn = async () => {
      await authService.signIn({ email: email.value, password: password.value, isSave: isAutoSignIn.value });
      router.push({ name: 'Home' });
    };

    const signOff = async () => {
      await authService.signOff();
      router.push({ name: 'Home' });
    };

    const signInBtnHandler = () => {
      signIn();
    };

    const signOffBtnHandler = () => {
      signOff();
    };

    return {
      email,
      password,
      isAutoSignIn,
      parseStr,
      isSignIn,
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
