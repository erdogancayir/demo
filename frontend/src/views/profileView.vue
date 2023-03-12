<template>
  <div>
    <br>
    <h1>This is an Profile page</h1>
    <img src="https://pbs.twimg.com/media/EzCinAcWQAswV6i?format=jpg&name=4096x4096" class="kucuk-resim"/>
    <!-- <input type="file" ref="fileInput" @change="handleFileUpload" /> -->
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
    return { info: "" };
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
