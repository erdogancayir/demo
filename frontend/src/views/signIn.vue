<template>
	<div class="login">
	  <form class="login-form">
		<h2>Giriş Yapın</h2>
		<div class="form-group">
		  <label for="username">Kullanıcı Adı:</label>
		  <input type="text" id="username" v-model="userName" placeholder="Kullanıcı adınızı girin">
		</div>
		<div class="form-group">
		  <label for="password">Şifre:</label>
		  <input type="password" id="password" v-model="password" placeholder="Şifrenizi girin">
		</div>
		<button class="btn" @click.prevent="loginFunct()">Giriş</button>
	  </form>
	</div>
  </template>
  
<script lang="ts">
import { defineComponent } from "vue";
import axios from 'axios'
import { useCookies } from 'vue3-cookies'
import VueAxios from 'vue-axios';  
const { cookies } = useCookies();

export default defineComponent({
	data() {
	  return {
		userName: '',
		password: '',
	  };
	},
	methods: {
	  loginFunct() {
		if (this.userName == "" || this.password == "")
        	return;
		const article = {
			userName: this.userName,
			password: this.password
		}

		const headers = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
	  axios.post(process.env.VUE_APP_BACKEND_URL + '/auth/signIn', article, headers)
	  .then(response => {
		if (response.data == "Wrong Email Or Password!") {
			this.$toast.add({ severity: 'Email veya şifre yanlış!', summary: 'email must be an email', detail: "Email doğru değil!", life: 3000 });
            return;
          }
		cookies.set("token", response.data, "15MIN");
	  }).catch(error => {
		this.$toast.add({ severity: 'ERROR !', summary: 'email must be an email', detail: "Email doğru değil!", life: 3000 });
	  });
	  },
	},
  });

  </script>
  
  <style lang="css" scoped>
  .container {
    margin-top: 50px;
  }
  </style>
  