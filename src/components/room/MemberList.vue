<template>
  <div class="member-list">
    <ul class="list">
      <li v-for="(m, i) in members" :key="i" class="item flex justify-center items-center">
        <Avatar />
        <p class="nickname ml-2">
          {{ m.nickname }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar.vue';

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

<style></style>
