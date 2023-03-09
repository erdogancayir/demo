<template>
  <div>
    <br>
    <h1>This is an Profile page</h1>
    {{ info }}
  </div>
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
          console.log(this.info);
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
