<template>
  <div>
    <h1>Welcome {{ currentUser.firstName }} {{ currentUser.lastName }}!</h1>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "profile",
  computed: {
    ...mapGetters(["currentUser"])
  }
};
</script>

<style></style>
