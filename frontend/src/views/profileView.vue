<template>
  <div>
    <br>
    <h1>This is an Profile page</h1>
  </div>
  <div class="w3-card-4" style="max-width:800px; margin: auto;border-radius: 50%; overflow: hidden;">
  <div class="w3-display-container w3-text-white">
    <img v-if="info && info.profilePicture" :src="image_url + info.profilePicture" style="width:100%" />
    <img v-else src="https://i.pinimg.com/474x/67/d8/37/67d8379604084dd7d7c7fa8d41f4c739.jpg" style="width:100%" />
      <!-- <button v-if="me" v-on:click="UploadImagePanel()" class="w3-display-bottomright w3-button w3-large w3-teal"
        style="margin: 15px;">+</button> -->
    </div>
  </div>
    <br>
    <br>
    <br>
    Name: {{ info.firstName }} <br>
    Lastname : {{ info.lastName }} <br>
    Username : {{ info.userName }} <br>
    E-mail : {{ info.email }}
</template>
  
<script lang="ts">

import { defineComponent, onMounted } from 'vue';
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
import axios from 'axios'
import VueAxios from 'vue-axios'

export default defineComponent({
  data() {
    return { info: "",
    image_url: process.env.VUE_APP_BACKEND_URL + "/auth/file/",
    };
  },
  beforeMount() {
    if (cookies.get("token") == null)
      this.$router.push({ path: '/' });
    setTimeout(this.GetUserData, 50);
  },
  methods: {
    async GetUserData() {
      try {
        const responseInfo = await fetch('http://localhost:3000/auth/me', {
          headers: {
            'Authorization': 'Bearer ' + cookies.get("token")
          }
        });
        if (responseInfo.ok) {
          this.info = await responseInfo.json();
        } else {
          console.error('Response not ok');
        }
      }
      catch (error) {
        console.error(error);
      }
    }
  }
});
</script>

<style>
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

.kucuk-resim {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin: 0 auto;
  display: block;
}
</style>
