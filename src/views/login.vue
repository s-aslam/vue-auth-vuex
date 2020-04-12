<template>
  <div class="login">
    <h1>Login</h1>
    <v-container>
      <v-form ref="loginForm">
        <div class="error--text" v-if="error">{{ error }}</div>
        <v-row justify="center">
          <v-col cols="6" sm="6">
            <v-text-field v-model="email" :rules="emailRules" label="E-mail"></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="6" sm="6">
            <v-text-field
              type="password"
              v-model="password"
              label="Password"
              :rules="passwordRules"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn @click="onSubmit">Login</v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { LOGIN, REMOVE_ERROR } from "../store/actions";

export default {
  name: "login",
  data() {
    return {
      passwordRules: [
        v => !!v || "This field is required",
        v => v.length >= 6 || "Password must contain at least 6 characters"
      ],
      emailRules: [
        v => !!v || "This field is required",
        v => /.+@.+/.test(v) || "Please enter valid Email."
      ],
      password: "",
      email: ""
    };
  },
  created() {
    this.$store.dispatch(REMOVE_ERROR);
  },
  computed: {
    ...mapGetters(["currentUser", "error", "isAuthenticated"])
  },
  methods: {
    onSubmit() {
      if (this.$refs.loginForm.validate()) {
        this.$store.dispatch(LOGIN, {
          email: this.email,
          password: this.password
        });
        if (!this.$store.getters.error) {
          this.$router.push({ name: "profile" });
        }
      }
    }
  }
};
</script>
