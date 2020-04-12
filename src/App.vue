<template>
  <v-app>
    <Header />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<style>
@import "./app.scss";
</style>

<script>
import Header from "../src/components/Header";

export default {
  name: "App",
  components: {
    Header
  }
};
</script>
