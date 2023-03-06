<template>
  <div class="home-page">
    <h1>Hoş Geldiniz!</h1>
    <div class="button-group">
      <button @click="registerFunc()" class="register-button">Kayıt Ol</button>
      <button class="login-button">Giriş Yap</button>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

export default defineComponent({
  methods: {
    registerFunc () {
      this.$router.push({ path: '/register' })
    },
  }
})
</script>

<style>
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: bisque;
}

.button-group {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}

.register-button {
  margin-right: 10px;
}

.login-button {
  margin-left: 10px;
}
</style>
