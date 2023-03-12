<template>
    <div class="about w3-animate-zoom">
      <br>
      <h1>Game Page</h1>
      <br>
      <canvas width="800" height="600" style="border: 2px solid salmon; max-width: 800px; width: 100%;"></canvas>
      <div v-if="!joinedGame">
        <br>
        <br>
        <button class="w3-btn w3-btn-block w3-green" v-on:click="StartGame(0/*JoinType.Random*/)">Join Random Room</button>
        <br>
        <br>
        <button class="w3-btn w3-btn-block w3-green" v-on:click="StartGame(1/*JoinType.Create*/)">Create Room</button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { useCookies } from "vue3-cookies";
  
  enum Me {
  firstUser,
  lastUser,
  viewer
}

export enum JoinType {
  Random,
  Craete,
  Player,
  Viewer,
}

  export default defineComponent({
    data() {
      return {
        global: this.$global as any,
        joinedGame: false,
      }
    },
    beforeRouteLeave() {
      //this.socket?.disconnect();
    },
    async beforeMount() {
      //get url info
    },
      //key events
    methods: {
      StartGame(joinType: JoinType) {

      }
     }
  });

  </script>
  
  