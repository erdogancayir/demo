<template>
  <div class="home-page">
    <div class="container">
      <h1>Hoş Geldiniz!</h1>
      <div class="button-group">
        <button @click="registerFunc()" class="register-button">Kayıt Ol</button>
        <button @click="signIn()" class="login-button">Giriş Yap</button>
      </div>
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
    signIn () {
      this.$router.push({ path: '/signIn' })
    }
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
	background-color: #f2f2f2;
}
.container {
  background-color: #8a8383;
  padding: 20px;
  border-radius: 10px;
  height: 10;
}

.button-group {
  display: flex;
  flex-direction: row;
  margin-top: 200px;
  width: 200px;
}

.register-button {
	background-color: #ffffff;
	border-radius: 10px;
	padding: 20px;
	box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
	width: 100px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.login-button {
  background-color: #ffffff;
	border-radius: 10px;
	padding: 20px;
	box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
	width: 100px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
</style>