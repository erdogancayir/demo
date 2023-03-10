<template>
  {{ start() }}
  <nav v-if="isSigned">
    <router-link to="/profile">Profile</router-link> | 
    <router-link to="/chat">Chat</router-link> | 
    <router-link to="/about">About</router-link> | 
    <button @click="signOut()">Sign Out</button>
  </nav>
  <nav v-if="!isSigned">
    <router-link to="/">Home</router-link> |
    <router-link to="/signIn">Sign in</router-link> |
    <router-link to="/about">About</router-link> 
  </nav>
  <router-view/>
  
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useCookies } from 'vue3-cookies'
import VueAxios from 'vue-axios';
const { cookies } = useCookies();

  export default defineComponent ({
    data() {
      return {
        isSigned : false,
      };
    },
    methods: {
      start() {
        if (cookies.get('token') != null)
          this.isSigned = true;
      },
      signOut() {
        let answer = confirm("Are you sure ?");
        if (answer != true)
          return ;
        cookies.remove('token');
        this.$router.push({ path: '/' }).then(() => {
          this.$router.go(0);
      });
      }
    }
  });
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
