<template>
  <aside v-show="showSideNav" class="sideNav">
    <nav class="nav">
      <ul @click="onListClick">
        <li v-for="(item, i) in navItemList" :key="i">
          <router-link :to="{ name: item.name }" class="nav__item">{{
            parseStr(`${item.strKey}`)
          }}</router-link>
        </li>
      </ul>
      <div class="divide" />
    </nav>
  </aside>
</template>

<script>
import { parseStr } from "@/utils";
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState("context", ["showSideNav"]),
    navItemList() {
      return [
        { name: "home", strKey: "home" },
        { name: "broadcast", strKey: "broadcast" },
      ];
    },
  },
  methods: {
    parseStr,
    ...mapActions("context", ["setSideNav"]),
    onListClick() {
      this.setSideNav(false);
    },
  },
};
</script>

<style lang="scss">
.sideNav {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  width: 240px;
  height: 100%;
  background-color: #f7f7f7;
  z-index: 2;

  .divide {
    height: 1px;
    background-color: #e6e6e6;
  }

  .nav {
    width: 100%;
    height: 100%;
    margin-top: 56px;

    ul {
      padding: 0;
      margin: 0;
    }

    li {
      list-style: none;
    }

    &__item {
      display: block;
      padding: 15px;
      font-size: 14px;
      line-height: 20px;
      color: #4d4d4d;
    }
  }
}
</style>
