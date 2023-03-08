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
	  axios.post("http://127.0.0.1:3000/auth/login", article, headers)
	  .then(response => {
		cookies.set("token", response.data, "15MIN");
	  }).catch(error => {
		alert('ERROR !');
	  });
	  },
	},
  });

  </script>
  
  <style>
  .container {
    margin-top: 50px;
  }
  </style>
  