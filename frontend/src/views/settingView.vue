<template>
    <div class="settings-container">
      <h2>Bye :)</h2>
      <div class="form-group">
        <button class="btn-center" @click="signOut">Sign Out</button>
        <button class="btn-center" @click="deleteAccount">Delete Account</button>
      </div>
    </div>
    <Toast />
  </template>
  
  <script lang="ts">

  import { defineComponent } from 'vue';
  import { useCookies } from 'vue3-cookies'
  import VueAxios from 'vue-axios';
  const { cookies } = useCookies();

  export default defineComponent({
    methods: {
        signOut() {
        let answer = confirm("Are you sure ?");
        if (answer != true)
          return ;
        cookies.remove('token');
        this.$router.push({ path: '/' }).then(() => {
          this.$router.go(0);
      });
    },      
    async deleteAccount() {
      let answer = confirm("Hesabın kalıcı olarak silinsin mi?");
      if (answer == false)
        return ;
        
        await fetch(process.env.VUE_APP_BACKEND_URL + "/auth/deleteAccount", {
          headers: {
            'Authorization': 'Bearer ' + cookies.get("token")
          }
        });
				this.$toast.add({ severity: 'dw', summary: 'Delete account clicked', detail: "Blank text", life: 3000 });
        cookies.remove('token');
        this.$router.push({ path: '/' });
      },
    },
  });
  </script>
  
  <style scoped>
  .settings-container {
    text-align: center;
  }
  
  .buttons-container {
    margin-top: 20px;
  }
  
  .btn-center {
    margin: 0 10px;
  }
  </style>
  <style>
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