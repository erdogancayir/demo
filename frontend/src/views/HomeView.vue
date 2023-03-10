<template>
  {{ start() }}
	<div class="container">
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
import VueAxios from 'vue-axios'
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();

export default defineComponent({
  data() {
    return {
      intra: false,
    }
  },
  methods: {
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
      axios.post(process.env.VUE_APP_BACKEND_URL + "/auth/signin_intra", article, headers)
        .then(response => {
          /* this.SetTimeOut(response.data);
          this.SocketConnect(); */
          this.$router.push({ path: '/profile' });
        })
        .catch(error => {
          alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin!")
        });
    }
  },
  beforeMount() {
    this.intraControl();
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
color: #333333;
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