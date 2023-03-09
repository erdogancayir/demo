<template>
  <div class="about w3-animate-zoom">
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
    return { info: "efe" };
  },
  beforeMount() {
    if (cookies.get("token") == null)
      this.$router.push({ path: '/' });
    setTimeout(this.GetUserData, 50);
  },
  methods: {
    async GetUserData() {
      const responseInfo = await fetch('http://localhost:3000/users/me', {
        headers: {
          'Authorization': 'Bearer ' + cookies.get("token")
        }
      });
      this.info = await responseInfo.json();
    }
  }
});
</script>
