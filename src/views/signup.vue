<template>
  <div class="login">
    <h1>Sign Up</h1>
    <v-container>
      <v-form ref="signUpForm">
        <div class="error--text" v-if="error">{{ error }}</div>
        <v-row justify="center">
          <v-col cols="6" sm="3">
            <v-text-field v-model="firstName" :rules="firstNameRules" label="First Name"></v-text-field>
          </v-col>
          <v-col cols="6" sm="3">
            <v-text-field v-model="lastName" :rules="lastNameRules" label="Last Name"></v-text-field>
          </v-col>
        </v-row>
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
        <v-btn @click="onSubmit">Sign Up</v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import { REGISTER, REMOVE_ERROR } from "../store/actions";
import { mapGetters } from "vuex";

export default {
  name: "signup",
  data() {
    return {
      firstNameRules: [v => !!v || "This field is required"],
      lastNameRules: [v => !!v || "This field is required"],
      passwordRules: [
        v => !!v || "This field is required",
        v =>
          (v && v.length >= 6) || "Password must contain at least 6 characters"
      ],
      emailRules: [
        v => !!v || "This field is  required",
        v => /.+@.+/.test(v) || "Please enter valid Email."
      ],
      password: null,
      email: null,
      firstName: null,
      lastName: null
    };
  },
  created() {
    this.$store.dispatch(REMOVE_ERROR);
  },
  computed: {
    ...mapGetters(["error"])
  },
  methods: {
    onSubmit() {
      if (this.$refs.signUpForm.validate()) {
        const data = {
          password: this.password,
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName
        };
        this.$store.dispatch(REGISTER, data);
        if (!this.$store.getters.error) {
          this.$router.push({ name: "login" });
        }
      }
    }
  }
};
</script>
