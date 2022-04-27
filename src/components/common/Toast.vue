<template>
  <div :class="{ show: show }" class="toast">
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  data: () => ({
    text: 'toast',
    show: false
  }),
  methods: {
    showToast(text) {
      this.text = text;
      this.show = true;

      setTimeout(() => {
        this.show = false;
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.toast {
  position: fixed;
  top: -40px;
  left: 0px;
  width: 100%;
  height: 40px;
  background: rgba(#fff, 0.6);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: top ease-in-out 0.3s;
  backdrop-filter: blur(3px);

  > p {
    font-size: 16px;
  }

  &.show {
    top: 0px;
  }
}
</style>
