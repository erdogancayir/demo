<template>
	<div class="register">
		<h1>Register</h1>
		<form>
		<div>
			<label for="name">Name:</label>
			<input type="text" id="name" v-model="name" />
		</div>
		<div>
			<label for="userName">Username:</label>
			<input type="text" id="userName" v-model="userName" />
		</div>
		<div>
			<label for="surname">Surname:</label>
			<input type="text" id="surname" v-model="surname" />
		</div>
		<div>
			<label for="email">Email:</label>
			<input type="email" id="email" v-model="email" />
		</div>
		<div>
			<label for="password">Password:</label>
			<input type="password" id="password" v-model="password" />
		</div>
		<button type="button" @click="registerUser">Register</button>
		</form>
	</div>
	</template>
	
	<script lang="ts">
	import { defineComponent } from 'vue'
	import axios from 'axios'
	import VueAxios from 'vue-axios'
	
	export default defineComponent({
	name: 'RegisterView',
	data () {
		return {
		name: '',
		surname: '',
		email: '',
		password: '',
		userName: ''
		}
	},
	methods: {
		registerUser () {
		const article = {
			name: this.name,
			username: this.userName,
			surname: this.surname,
			email: this.email,
			password: this.password
		}
	
		const headers = {
			headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
			}
		}

		if (this.name == '' || this.surname == '' || this.email == '' || this.password == '' || this.userName == '')
		{
			alert("Lutfen bos gecmeyelim !");
			return ;
		}
	
		axios.post('http://localhost:3000/auth/register', article, headers)
			.then(response => {
				if (response.data == "Error")
				{
					alert("Somethings wrong !  :  " + response.data);
					return ;
				}
			}).catch(error => {
					if (error.response.data.message[0] == "email must be an email") {
						alert("Email doğru değil!")
						return;
					}
					alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin!")
				});
			}
		}
	});
	</script>
	
	<style scoped>
	.register {
	max-width: 20rem;
	margin: 0 auto;
	padding: 1rem;
	border: 1px solid #ccc;
	border-radius: 0.5rem;
	box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
	}
	
	h1 {
	font-size: 1.5rem;
	margin-bottom: 1rem;
	}
	
	form div {
	margin-bottom: 0.5rem;
	}
	
	label {
	display: block;
	margin-bottom: 0.25rem;
	font-weight: bold;
	}
	
	input {
	padding: 0.5rem;
	font-size: 1rem;
	border-radius: 0.25rem;
	border: none;
	box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
	width: 100%;
	}
	
	button {
	background-color: #4caf50;
	color: white;
	padding: 0.5rem 1rem;
	border: none;
	border-radius: 0.25rem;
	font-size: 1rem;
	cursor: pointer;
	}
	</style>
	