<template>
  <aside v-show="showSideNav" class="side-nav">
    <div class="my-info">
      <Avatar></Avatar>
      <p class="nickname">{{ nickname }}</p>
    </div>
    <hr class="divider" />
    <nav class="nav">
      <ul @click="onListClick" class="list">
        <li v-for="(item, i) in navItemList" :key="i" class="list__item">
          <router-link :to="{ name: item.name }">{{ parseStr(`${item.strKey}`) }}</router-link>
        </li>
      </ul>
      <hr class="divider" />
    </nav>
  </aside>
</template>

<script>
import { parseStr } from '@/utils';
import { mapActions, mapState, mapGetters } from 'vuex';
import Avatar from '@/components/common/Avatar.vue';

export default {
  components: {
    Avatar
  },
  computed: {
    ...mapState('context', ['showSideNav']),
    ...mapGetters('auth', ['accountInfo']),
    nickname() {
      return this.accountInfo?.nickname || '';
    },
    navItemList() {
      return [
        { name: 'home', strKey: 'HOME' },
        { name: 'broadcast', strKey: 'BROADCASTING' }
      ];
    }
  },
  methods: {
    parseStr,
    ...mapActions('context', ['setSideNav']),
    onListClick() {
      this.setSideNav(false);
    }
  }
};
</script>

<style lang="scss" scoped>
.side-nav {
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  width: 240px;
  height: 100%;
  padding: 20px;
  background-color: #f7f7f7;
  z-index: 10;

  .my-info {
    display: flex;
    justify-content: center;
    align-items: center;
    .nickname {
      margin-left: 8px;
      color: #4d4d4d;
      font-size: 14px;
    }
  }

  .divider {
    height: 1px;
    margin: 30px 0;
    background-color: #e6e6e6;
  }

  .nav {
    width: 100%;
    height: 100%;

    .list {
      display: flex;
      flex-direction: column;
      gap: 20px;
      &__item {
        font-size: 14px;
        color: #4d4d4d;
      }
    }
  }
}
</style>
