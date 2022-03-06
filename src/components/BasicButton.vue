<template>
  <button @click="$emit('click')" class="basic-button"><slot></slot></button>
</template>

<script>
export default {
  name: 'BasicButton'
};
</script>

<style lang="scss" scoped>
.basic-button {
  padding: 8px;
  color: #fff;
  border: solid 1px #fff;
  border-radius: 4px;
  cursor: pointer;
}
</style>
