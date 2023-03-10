<template>
	{{ start() }}
	<div class="register">
		<h1>Register</h1>
		<form>
			<div class="form-group">
				<label for="name">Name:</label>
				<input type="text" id="name" v-model="firstName" />
			</div>
			<div class="form-group">
				<label for="userName">Username:</label>
				<input type="text" id="userName" v-model="userName" />
			</div>
			<div class="form-group">
				<label for="surname">Surname:</label>
				<input type="text" id="surname" v-model="lastName" />
			</div>
			<div class="form-group">
				<label for="email">Email:</label>
				<input type="email" id="email" v-model="email" />
			</div>
			<div class="form-group">
				<label for="password">Password:</label>
				<input type="password" id="password" v-model="password" />
			</div>
			<button type="button" @click="registerUser">Register</button>
		</form>
	</div>
	<Toast />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies();


export default defineComponent({
	name: 'RegisterView',
	data() {
		return {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			userName: ''
		}
	},
	methods: {
		registerUser() {
			const article = {
				firstName: this.firstName,
				userName: this.userName,
				lastName: this.lastName,
				email: this.email,
				password: this.password
			}

			const headers = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}

			if (this.firstName == '' || this.lastName == '' || this.email == '' || this.password == '' || this.userName == '') {
				this.$toast.add({ severity: 'error', summary: 'Error Message', detail: "bozuk", life: 3000 });
				return;
			}
			axios.post(process.env.VUE_APP_BACKEND_URL + '/auth/register', article, headers)
				.then(response => {
					if (response.data == "Error") {
						this.$toast.add({ severity: 'error', summary: 'Error', detail: response.data, life: 3000 });
						return;
					}
					else if (response.data == "Mail Duplicate!")
					{
						this.$toast.add({ severity: 'error', summary: response.data, detail: response.data, life: 3000 });
						return ;
					}
					this.$toast.add({ severity: 'Kayıt Başarılı', summary: response.data, detail: response.data, life: 3000 });
          			this.$router.push({ path: 'signIn' });
				}).catch(error => {
					if (error.response.data.message[0] == "email must be an email") {
						this.$toast.add({ severity: 'error', summary: 'email must be an email', detail: "Email doğru değil!", life: 3000 });
						return;
					}
					alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin!")
				});
		},
		start() {
			if (cookies.get('token') != null)
				this.$router.push( { path: '/' });
		}
	}
});
</script>
	
<style scoped>
.register {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f2f2f2;
}

form {
  background-color: #f2f2f2;
  border-radius: 10px;
  padding: 20px;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  margin: 0 0 20px;
  color: #8a8383;
}

.form-group {
  margin-bottom: 10px;
}

label {
  margin-right: 10px;
}

input {
  padding: 10px;
  border-radius: 10px;
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