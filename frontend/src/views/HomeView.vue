<template>
  {{ start() }}
	<div class="container">
    <div class="jumbotron text-center">
      <h1 style="font-family:Montserrat font-size: 3rem; font-weight: bold; color: #007bff;">Erdog & Canodis</h1>
		  <br>
		</div>
    <h1>Hoş Geldiniz!</h1>
    {{ start() }}
		<div class="form-group">
      <button @click="registerFunc()" class="register-button">Kayıt Ol</button>
		</div>
		<div class="form-group">
		  <button @click="signIn()" class="login-button">Giriş Yap</button>
		</div>
    <div class="form-group">
      <button @click="withIntra()" class="register-button">Intra ile Giriş Yap</button>
		</div>
	</div>
  </template>
  

<script lang="ts">

import { defineComponent } from 'vue'
import axios from 'axios'
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();
import jwt_decode, { JwtPayload } from "jwt-decode";
import { io, connect, Socket } from "socket.io-client";

export default defineComponent({
  beforeMount() {
    this.intraControl();
  },
  beforeRouteEnter(to, from, next) {
    var code: string | null = to.query.code as string;
    next((vm: any) => {
      vm.intra = (code != null);
    })
  },
  data() {
    return {
      global: this.$global as any,
      intra: false,
    }
  },
  methods: {
    SocketConnect() {
      const token = cookies.get("token");
      if (token != null) {
        const socketOptions = { transportOptions: { polling: { extraHeaders: { Authorization: token, } } } };
          this.global.socket = io(process.env.VUE_APP_BACKEND_URL, socketOptions);
      }
    },
    registerFunc () {
      if (!this.cookieCheck())
        this.$router.push({ path: '/register' });
    },
    withIntra() {
      window.open(process.env.VUE_APP_INTRA_URL, '_self');
    },
    signIn () {
      if (!this.cookieCheck())
        this.$router.push({ path: '/signIn' });
    },
    start() {
      if (this.cookieCheck())
        this.$router.push({ path: '/profile' });
    },
    cookieCheck() {
      return cookies.get('token') == null ? false : true;
    },
    intraControl() {
      var code: string | null = this.$route.query.code as string;
      if (code == null)
        return;
      this.intra = true;
      this.getTokenWithIntra(code);
    },
    getTokenWithIntra(code: string) {
      const article = {
        code: code
      };
      const headers = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };
      axios.post(process.env.VUE_APP_BACKEND_URL + "/auth/intra", article, headers)
        .then(response => {
          cookies.set("token", response.data);
          this.SocketConnect(); 
          this.$router.push({ path: '/profile' }).then(
            () => { this.$router.go(0); }
          );
        })
        .catch(error => {
          alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin!")
        });
    }
  },
})
</script>

<style scoped>
.container {
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100vh;
background-color: #f2f2f2;
}

form {
background-color: #8a8383;
border-radius: 10px;
padding: 20px;
box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
width: 400px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
}

h1 {
margin: 0 0 20px;
color: #000000;
}

.form-group {
margin-bottom: 10px;
}

label {
margin-right: 10px;
}

input {
padding: 10px;
border-radius: 5px;
border: none;
margin-bottom: 10px;
width: 100%;
}

button {
background-color: #000000;
color: rgb(249, 249, 249);
padding: 10px 20px;
border-radius: 5px;
border: none;
cursor: pointer;
font-size: 16px;
margin-bottom: 10px;
transition: background-color 0.2s ease;
}

button:hover {
background-color: #3e8e41;
}

.error-message {
color: red;
margin-top: 10px;
font-size: 14px;
}
</style>