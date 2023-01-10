import Vue from 'vue'

Vue.mixin({
  methods: {
    hasOwnPermission(key) {
      return this.$store.state.user.userInfo.roles.points.includes(key) || false
    }
  }
})
