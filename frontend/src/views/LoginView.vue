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
	  axios.post("http://127.0.0.1:3000/auth/login", article, headers)
	  .then(response => {
		cookies.set("token", response.data, "15MIN");
	  }).catch(error => {
		alert('ERROR !');
	  })
	  },
	},
  });
  </script>
  
  <style scoped>
  .login {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
  }
  
  .login-form {
	width: 400px;
	border: 1px solid #ccc;
	padding: 20px;
  }
  
  .form-group {
	margin-bottom: 10px;
  }
  
  label {
	display: block;
	margin-bottom: 5px;
  }
  
  input[type="text"],
  input[type="password"] {
	width: 100%;
	padding: 10px;
	border-radius: 5px;
	border: 1px solid #ccc;
  }
  .btn {
	background-color: #4CAF50;
	border: none;
	color: white;
	padding: 10px 20px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 16px;
	border-radius: 5px;
	cursor: pointer;
  }
  </style>