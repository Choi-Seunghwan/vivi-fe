<template>
  <section class="adv-section">
    <div class="inner">
      <h2 class="main-text">
        <pre>{{ parseStr('ADV_MAIN_TEXT') }}</pre>
      </h2>
      <div class="logo-wrap">
        <h1 class="logo">
          {{ parseStr('VIVI') }}
        </h1>
      </div>
    </div>
  </section>
</template>

<script>
import { parseStr } from '@/utils';

export default {
  name: 'AdvSection',
  methods: {
    parseStr
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/base.scss';

.adv-section {
  position: relative;

  .inner {
    position: absolute;
    width: 400px;
    top: 0;
    right: 90px;

    .main-text {
      margin-top: 200px;
      > pre {
        font-size: 30px;
        font-family: 'SBAggroB';
      }
    }

    .logo-wrap {
      width: 300px;
      height: 164px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff;
      border: 0px solid #fff;
      border-radius: 4px;
      margin-top: 40px;

      .logo {
        font-size: 120px;
        padding-top: 12px;
        font-family: 'SBAggroB';
        background: $color-gradient-primary;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
}
</style>
