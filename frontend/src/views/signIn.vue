<template>
	<div class="container">
		<h1>Sign In</h1>
		<div class="form-group">
			<label for="username">Username:</label>
			<input type="text" id="username" name="email" v-model="email">
		</div>
		<div class="form-group">
			<label for="password">Password:</label>
			<input type="password" id="password" name="password" v-model="password">
		</div>
		<button type="button" @click="GetTokenWithSingIn">Sign In</button>
	</div>
	<div>
		<Toast />
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
			email: "" as string,
			password: "" as string,
			intra: false as boolean
		}
	},
	methods: {
		GetTokenWithSingIn() {
			if (this.email == "" || this.password == "") {
				this.$toast.add({ severity: 'SignIn Empty', summary: 'Error Message', detail: "bozuk", life: 3000 });
				return;
			}
			const article = {
				email: this.email,
				password: this.password,
			};

			const headers = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}

			axios.post("http://127.0.0.1:3000/auth/signIn", article, headers)
				.then(response => {
					if (response.data == "Wrong Email Or Password!") {
						alert("Email veya şifre yanlış!")
						return;
					}
				})
				.catch(error => {
					if (error.response.data.message[0] == "email must be an email") {
						alert("Email doğru değil!")
						return;
					}
					alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin!")
				});
		},
	}
});
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
  