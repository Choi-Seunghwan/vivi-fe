<template>
  <div class="screen">
    <!-- <div class="member-info">
      <div></div>
    </div> -->
    <div class="screen">
      <p>카메라 준비중</p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Screen'
};
</script>

<style lang="scss" scoped>
.member-screen {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.member-info {
  position: absolute;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 48px;
  z-index: 1;
  top: 0;
  left: 0;
}

.screen {
  display: flex;
  width: 100%;
  height: 100%;
  background: #aaa;
  align-items: center;
}
</style>
