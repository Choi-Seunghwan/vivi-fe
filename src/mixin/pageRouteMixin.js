const pageRouteMixin = {
  methods: {
    $_routeMainPage(...args) {
      const { query } = args;
      this.$router.push({ name: 'Main', query });
    },

    $_routeLoginPage(...args) {
      const { query } = args;
      this.$router.push({ name: 'Login', query });
    }
  }
};

export default pageRouteMixin;
