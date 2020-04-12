<template>
  <div id="nav" v-if="!isAuthenticated">
    <router-link to="/">Home</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/signup">Sign Up</router-link>
  </div>
  <div id="nav" v-else>
    <router-link to="/">Home</router-link> |
    <router-link to="/profile">Profile</router-link> |
    <a @click="logout">Logout</a>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { LOGOUT } from '../store/actions';

export default {
  name: "login",
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"])
  }, 
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT);
    }
  }
}
</script>