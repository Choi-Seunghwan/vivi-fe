<template>
  <div class="member-list">
    <ul class="list">
      <li v-for="(m, i) in members" :key="i" class="item flex justify-center items-center">
        <Avatar />
        <p class="nickname">
          {{ m.nickname }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import Avatar from '@/components/common/Avatar.vue';

export default {
  name: 'MemberList',
  components: { Avatar },
  props: {
    members: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss"></style>
