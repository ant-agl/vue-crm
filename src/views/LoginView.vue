<template>
  <form class="card auth-card" @submit.prevent="submit">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          :class="[v$.email.$error ? 'invalid' : 'validate']"
          v-model.trim="email"
        />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="v$.email.$error && v$.email.required.$invalid"
        >
          Обязательное поле
        </small>
        <small
          class="helper-text invalid"
          v-else-if="v$.email.$error && v$.email.email.$invalid"
        >
          Введите корректный email
        </small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          :class="[v$.password.$error ? 'invalid' : 'validate']"
          v-model.trim="password"
        />
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-if="v$.password.$error && v$.password.required.$invalid"
        >
          Обязательное поле
        </small>
        <small
          class="helper-text invalid"
          v-else-if="v$.password.$error && v$.password.minLength.$invalid"
        >
          Минимальная длина пароля
          {{ v$.password.minLength.$params.min }} символов. Текущая длина
          {{ password.length }}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { email, required, minLength } from "@vuelidate/validators";

export default {
  name: "LoginView",
  setup: () => ({
    v$: useVuelidate(),
  }),
  data: () => ({
    email: "",
    password: "",
  }),
  validations: () => ({
    email: { email, required },
    password: { required, minLength: minLength(6) },
  }),
  methods: {
    submit() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }

      let formData = {
        email: this.email,
        password: this.password,
      };

      this.$store.dispatch("login", formData).then((success) => {
        if (success) this.$router.push("/?message=successlogin");
      });
    },
  },
};
</script>
