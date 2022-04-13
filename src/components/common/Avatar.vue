<template>
  <div class="avatar">
    <img :src="imgSrc ? imgSrc : '/images/user-icon.png'" class="icon" />
  </div>
</template>

<script>
export default {
  props: {
    imgSrc: {
      default: '',
      type: String
    }
  }
};
</script>

<style lang="scss" scoped>
.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #ddd;
  justify-content: center;
  align-items: center;

  .icon {
    width: 32x;
    height: 32px;
  }
}
</style>
